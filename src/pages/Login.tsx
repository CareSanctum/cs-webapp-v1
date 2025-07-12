import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { AnimatedInput } from '@/components/AnimatedInput';
import { Eye, EyeOff, Shield, ArrowRight, Loader2 } from 'lucide-react';
import { useLogin } from '@/hooks/use-login.hook';
import { useQueryClient } from "@tanstack/react-query";
import { useToast } from '@/hooks/use-toast';
import { useAuthStore } from '@/store/AuthStore';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const {mutate, status} = useLogin();
  const queryClient = useQueryClient();
  const {toast} = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    mutate({username, password}, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['authStatus'] });
        // Clear browser history and replace current entry to prevent back navigation to login
        window.history.replaceState(null, '', '/');
        navigate('/', { replace: true });
      },
      onError: (error) => {
        toast({
          title: 'Error',
          description: 'An error has occurred. Please try again.',
          variant: 'destructive',
        });
      }
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl pt-6">
          <div className="flex justify-center ">
            <img 
              src="/lovable-uploads/ce42e031-be3b-4c21-8b06-f0ea6e60fe7e.png" 
              alt="CareStanctum Logo" 
              className="h-16 w-auto "
            />
          </div>
          <CardHeader className="text-center space-y-2 pb-6">
            <CardTitle className="text-2xl font-bold text-gray-900">Welcome Back</CardTitle>
            <CardDescription className="text-gray-600">
              Sign in to your CareSanctum account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <AnimatedInput
                  type="text"
                  label="Email / Phone Number"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  className="bg-white border-gray-300 focus:border-[#3d007d] "
                />
              </div>
              
              <div className="space-y-2">
                <div className="relative">
                  <AnimatedInput
                    type={showPassword ? "text" : "password"}
                    label="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="bg-white border-gray-300 focus:border-[#3d007d]"
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              <Button 
                type="submit" 
                className="w-full bg-gradient-to-r from-[#3d007d] to-[#ba48b3] hover:from-[#731F94] hover:to-[#A53CAA] text-white h-12 text-base font-medium shadow-lg hover:shadow-xl transition-all duration-200"
                disabled={status === 'pending'}
              >
                {status === 'pending' ? (
                  <div className="flex items-center gap-2">
                    <Loader2 className="animate-spin" />
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    Sign In
                    <ArrowRight className="h-4 w-4" />
                  </div>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center mt-8">
          <p className="text-xs text-gray-500">
            © 2025 CareSanctum. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
