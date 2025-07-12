import { Separator } from "./ui/separator"
export function ConsentBody(){
    return (
        <div className="pb-24 max-w-4xl mx-auto px-4 py-8">
        <div className="space-y-8">
          {/* Header */}
          <div className="text-center space-y-4">
            <h1 className="text-3xl font-bold tracking-tight">CARE SANCTUM - CONSENT FORM FOR HYBRID RESPONDER MODEL</h1>
          </div>

          <Separator />

          {/* Introduction */}
          <section className="space-y-4">
            <p className="text-muted-foreground leading-relaxed">
            Dear Resident,<br />
            As part of the Care Sanctum Hybrid Responder Model being implemented in your society, we seek your informed consent to participate in this safety and wellness program. The details of the services, data usage, responsibilities, and protocols are outlined below.
            </p>
            <h2 className="text-2xl font-semibold">1. Personal & Wellness Information</h2>
            <p className="text-muted-foreground leading-relaxed">
                By signing this consent form, you acknowledge and permit Care Sanctum to collect and store the following information:
            </p>
            <ul className="list-disc space-y-2 text-muted-foreground ml-4">
              <li>Basic health history and ongoing medical conditions.</li>
              <li>Preferred doctors/hospitals.</li>
              <li>Insurance provider and card number.</li>
              <li>Contact details of your Next of Kin (NOK).</li>
              <li>And any other information needed to help you during an emergency.</li>
            </ul>
            <p className="text-muted-foreground leading-relaxed">
            This information will be accessed <span className="font-bold text-black">only during emergencies</span> when you initiate an SOS or for sharing the information with doctor to provide better wellness insight to you.. This will help us act swiftly in your best interest.
            </p>
          </section>

          <Separator />

          {/* User Accounts */}
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">2. Device Installation & Ownership</h2>
            <ul className="list-disc space-y-2 text-muted-foreground ml-4">
              <li>All devices (including SOS buttons, motion sensors, fall detectorWe reserve the right to suspend or terminate accounts that violate these termss, smart watches, and any other devices, etc.) installed by Care Sanctum remain <span className="font-bold text-black">the property of Care Sanctum.</span></li>
              <li>These devices are being made available to you as part of a <span className="font-bold text-black">subscription-based service</span> and are not sold or transferred to residents.</li>
              <li>Care Sanctum technicians will install, maintain, and, if needed, replace these devices. However, the user is responsible for physical damage or loss of the product.</li>
            </ul>
          </section>

          <Separator />

          {/* Service Usage */}
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">3. Data Usage & Privacy</h2>
            <p className="text-muted-foreground leading-relaxed">
              You agree to use our service only for lawful purposes and in accordance with these Terms.
            </p>
            <ul className="list-disc space-y-2 text-muted-foreground ml-4">
              <li>Health data generated through these devices will be <span className="font-bold text-black">used internally by Care Sanctum for research, model training, and improving emergency responsiveness.</span> However, no Personally identifiable information (PII)  will be used.</li>
              <li>This data will not be shared publicly or sold to third parties</li>
            </ul>
          </section>

          <Separator />

          {/* Privacy and Data */}
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">4. Non-intrusive Technology</h2>
            <p className="text-muted-foreground leading-relaxed">
              Your privacy is important to us. Our Privacy Policy explains how we collect, use, and protect your
              information.
            </p>
            <ul className="list-disc space-y-2 text-muted-foreground ml-4">
              <li>None of the installed safety devices capture <span className="font-bold text-black">audio or video recordings.</span></li>
              <li>All devices are passive, focusing solely on motion, fall, gas leak, smoke detection, SOS triggers or any other wellness and safety related requirement</li>
              <li>Your privacy and dignity remain central to our implementation.</li>
            </ul>
          </section>

          <Separator />

          {/* Payment Terms */}
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">5. Emergency Intervention Protocol</h2>
            <p className="text-muted-foreground leading-relaxed">
            In case of an SOS trigger and when:
            </p>
            <ul className="list-disc space-y-2 text-muted-foreground ml-4">
              <li>The resident does not respond to follow-up calls/messages AND</li>
              <li>The registered NOK is unavailable/unreachable,</li>
            </ul>
            <p className="text-muted-foreground leading-relaxed">
                The society is <span className="font-bold text-black">authorized by the resident</span> (through this consent) to:
            </p>
            <ul className="list-disc space-y-2 text-muted-foreground ml-4">
              <li>Attempt entry via <span className="font-bold text-black">keymaker</span> or</li>
              <li><span className="font-bold text-black">Break open the door</span> following the <span className="font-bold text-black">society’s emergency break-in protocol.</span></li>
            </ul>
            <p className="text-muted-foreground leading-relaxed">
            This action must be executed:
            </p>
            <ul className="list-disc space-y-2 text-muted-foreground ml-4">
                <li><span className="font-bold text-black">By the security guard or any relevant person assigned by society</span>, and</li>
                <li>In the <span className="font-bold text-black">presence of at least one elected member of the society committee or person nominated by NOK.</span></li>
            </ul>
            <p className="text-muted-foreground leading-relaxed">
            This is done solely in the interest of resident safety and well-being.
            </p>
          </section>

          <Separator />

          {/* Intellectual Property */}
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold"> 6. Liability Clause</h2>
            <ul className="list-disc space-y-2 text-muted-foreground ml-4">
              <li>Care Sanctum and the Society will act in good faith, based on this consent, during emergencies.</li>
              <li>Neither party shall be held liable for any consequence arising from <span className="font-bold text-black">lack of available information, device malfunction, or delays caused due to unavailability of NOK or proper decisioning by NOK.</span></li>
              <li>If consent is <span className="font-bold text-black">not provided</span> (see below), and no NOK is reachable, <span className="font-bold text-black">Care Sanctum and the Society will not initiate rescue</span> and the society will decide what needs to be done in that case.</li>
            </ul>
          </section>
        </div>
      </div>
    )
}