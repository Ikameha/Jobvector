import { AppNav } from "@/components/app-nav"

export default function TermsOfService() {
    return (
        <div className="min-h-screen bg-background text-foreground">
            <AppNav />
            <div className="container mx-auto px-4 py-16 max-w-3xl">
                <h1 className="text-4xl font-bold mb-8">Terms of Service</h1>
                <div className="prose prose-invert max-w-none space-y-6 text-muted-foreground">
                    <p>Last updated: {new Date().toLocaleDateString()}</p>

                    <h2 className="text-2xl font-semibold text-foreground">1. Introduction</h2>
                    <p>
                        Welcome to Jobento. By accessing or using our website and services, you agree to be bound by these Terms of Service. If you disagree with any part of the terms, you may not access the service.
                    </p>

                    <h2 className="text-2xl font-semibold text-foreground">2. Use of Service</h2>
                    <p>
                        Jobento provides an AI-powered job matching platform. You agree to use the service only for lawful purposes and in accordance with these Terms. You are responsible for maintaining the confidentiality of your account credentials.
                    </p>

                    <h2 className="text-2xl font-semibold text-foreground">3. User Data</h2>
                    <p>
                        We collect and process your personal data as described in our Privacy Policy. By using Jobento, you consent to such processing and you warrant that all data provided by you is accurate.
                    </p>

                    <h2 className="text-2xl font-semibold text-foreground">4. Intellectual Property</h2>
                    <p>
                        The service and its original content, features, and functionality are and will remain the exclusive property of Jobento and its licensors.
                    </p>

                    <h2 className="text-2xl font-semibold text-foreground">5. Termination</h2>
                    <p>
                        We may terminate or suspend access to our service immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms.
                    </p>

                    <h2 className="text-2xl font-semibold text-foreground">6. Contact Us</h2>
                    <p>
                        If you have any questions about these Terms, please contact us at support@jobvector.com.
                    </p>
                </div>
            </div>
        </div>
    )
}
