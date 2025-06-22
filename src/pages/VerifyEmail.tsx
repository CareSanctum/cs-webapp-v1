
import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from '@/hooks/use-toast';

const VerifyEmail = () => {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [isLoading, setIsLoading] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const location = useLocation();
  const navigate = useNavigate();
  
  const email = location.state?.email || 'your email';

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  const handleChange = (index: number, value: string) => {
    if (value.length > 1) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerify = async () => {
    const otpString = otp.join('');
    if (otpString.length !== 6) {
      toast({
        title: "Invalid Code",
        description: "Please enter a 6-digit verification code.",
        variant: "destructive"
      });
      return;
    }
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Email Verified!",
        description: "Your account has been successfully verified.",
      });
      navigate('/');
    }, 1500);
  };

  const handleResendCode = async () => {
    setCountdown(60);
    setOtp(['', '', '', '', '', '']);
    inputRefs.current[0]?.focus();
    toast({
      title: "Code Sent",
      description: "A new verification code has been sent to your email.",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center space-y-4">
          <div className="flex justify-center">
            <img 
              src="/lovable-uploads/ce42e031-be3b-4c21-8b06-f0ea6e60fe7e.png" 
              alt="CareStanctum Logo" 
              className="h-16 w-auto"
            />
          </div>
          <CardTitle className="text-2xl font-bold text-gray-900">Verify Your Email</CardTitle>
          <CardDescription className="text-gray-600">
            We've sent a 6-digit verification code to{' '}
            <span className="font-medium text-gray-900">{email}</span>
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex justify-center space-x-3">
            {otp.map((digit, index) => (
              <input
                key={index}
                ref={(el) => (inputRefs.current[index] = el)}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                className="
                  w-14 h-16 text-center text-2xl font-semibold border-2 rounded-xl
                  border-cyan-400 focus:border-cyan-600 bg-white text-gray-900
                  transition-all duration-200 shadow-sm hover:shadow-cyan-200/40
                  focus:shadow-cyan-300/40 outline-none
                "
              />
            ))}
          </div>

          <Button 
            onClick={handleVerify}
            className="w-full bg-cyan-500 hover:bg-cyan-600 text-white"
            disabled={isLoading || otp.join('').length !== 6}
          >
            {isLoading ? 'Verifying...' : 'Verify Email'}
          </Button>

          <div className="text-center space-y-2">
            <p className="text-sm text-gray-600">
              Didn't receive the code?
            </p>
            <Button
              variant="ghost"
              onClick={handleResendCode}
              disabled={countdown > 0}
              className="text-cyan-600 hover:text-cyan-700"
            >
              {countdown > 0 ? `Resend in ${countdown}s` : 'Resend Code'}
            </Button>
          </div>

          <div className="text-center">
            <Button
              variant="ghost"
              onClick={() => navigate('/signup')}
              className="text-sm text-gray-600 hover:text-gray-800"
            >
              ← Back to Sign Up
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default VerifyEmail;
