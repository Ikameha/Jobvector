import { AppNav } from "@/components/app-nav"

export default function PrivacyPolicy() {
    return (
        <div className="min-h-screen bg-background text-foreground">
            <AppNav />
            <div className="container mx-auto px-4 py-16 max-w-3xl">
                <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
                <div className="prose prose-invert max-w-none space-y-6 text-muted-foreground">
                    <p>Last updated: {new Date().toLocaleDateString()}</p>

                    <h2 className="text-2xl font-semibold text-foreground">1. Information We Collect</h2>
                    <p>
                        We collect information you provide directly to us, such as when you create an account, update your profile, or communicate with us. This may include your name, email address, professional history, skills, and preferences.
                    </p>

                    <h2 className="text-2xl font-semibold text-foreground">2. How We Use Your Information</h2>
                    <p>
                        We use the information we collect to provide, maintain, and improve our services, including analyzing your profile to generate job matches and personalizing your experience on Jobento.
                    </p>

                    <h2 className="text-2xl font-semibold text-foreground">3. Data Sharing</h2>
                    <p>
                        We do not share your personal information with third parties except as described in this policy or with your consent. We may share data with service providers who help us operate our platform.
                    </p>

                    <h2 className="text-2xl font-semibold text-foreground">4. Data Security</h2>
                    <p>
                        We use reasonable measures to help protect information about you from loss, theft, misuse and unauthorized access, disclosure, alteration and destruction.
                    </p>

                    <h2 className="text-2xl font-semibold text-foreground">5. Your Rights</h2>
                    <p>
                        Depending on your location, you may have rights regarding your personal information, such as the right to access, correct, or delete your data.
                    </p>

                    <h2 className="text-2xl font-semibold text-foreground">6. Contact Us</h2>
                    <p>
                        If you have any questions about this Privacy Policy, please contact us at privacy@jobvector.com.
                    </p>
                </div>
            </div>
        </div>
    )
}
