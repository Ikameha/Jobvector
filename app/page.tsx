import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { GlassCard } from "@/components/ui/glass-card"
import { AnimatedText } from "@/components/ui/animated-text"
import { AnimatedCounter } from "@/components/ui/animated-counter"
import { PageTransition } from "@/components/ui/page-transition"
import { ArrowRight, Sparkles, CheckCircle2, TrendingUp, ChefHat, UtensilsCrossed, Fish, Utensils, LayoutGrid, Sprout, Soup, Croissant } from "lucide-react"

import { ScrollToTop } from "@/components/ui/scroll-to-top"
import { FAQAccordion } from "@/components/landing/faq-accordion"

export default function LandingPage() {
  return (
    <PageTransition className="min-h-screen">
      {/* Navigation */}
      <nav className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="relative h-16 w-48 transition-transform group-hover:scale-105">
                <Image
                  src="/jobento-logo.png"
                  alt="Jobento"
                  fill
                  className="object-contain object-left"
                  priority
                />
              </div>
            </Link>
            <div className="flex items-center gap-4">
              <Link href="/personal-profile">
                <Button variant="neon" size="sm">Find Jobs</Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative w-full pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
        {/* Asymmetrical radial gradient background */}
        <div
          className="absolute inset-0 -z-10 pointer-events-none"
          style={{
            background: `
              radial-gradient(
                800px circle at 20% 30%,
                rgba(59,130,246,0.12),
                transparent 60%
              ),
              radial-gradient(
                600px circle at 80% 60%,
                rgba(245,158,11,0.06),
                transparent 55%
              ),
              #F8FAFC
            `
          }}
        />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">

            <h1 className="mb-6 text-4xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
              Land the Right Job{" "}
              <AnimatedText
                text="Faster with AI"
                gradient={true}
                className="inline-block"
              />
            </h1>
            <p className="mb-8 text-lg text-muted-foreground sm:text-xl lg:text-2xl leading-relaxed max-w-3xl mx-auto flex flex-col gap-2">
              <span>Stop applying blindly.</span>
              <span>Start matching intelligently.</span>
              <span>Your dream job is out there.</span>
            </p>
            <div className="flex flex-col items-center gap-6">
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link href="/personal-profile">
                  <Button size="lg" variant="neon" className="h-12 px-8 text-base group shadow-[0_0_30px_rgba(61,124,255,0.4)] hover:shadow-[0_0_40px_rgba(61,124,255,0.6)]">
                    Find Jobs
                    <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>

              </div>
              <div className="flex items-center gap-6 text-sm text-muted-foreground/80">
                <span className="flex items-center gap-1.5"><CheckCircle2 className="h-4 w-4 text-[#F59E0B]" /> Free <span className="text-[#F59E0B]">·</span> 2-minute setup</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section - How It Works */}
      <section className="bg-background w-full pt-10 pb-20 lg:pt-12 lg:pb-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl mb-4">How Jobento Works</h2>
            <p className="text-lg text-muted-foreground">
              Three simple steps to find your dream job with data-driven insights
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
            {/* Feature 1 */}
            <GlassCard intensity="medium" neonBorder className="p-8 group hover:scale-105 transition-transform duration-300 flex flex-col items-center text-center">
              <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-xl bg-transparent shadow-none group-hover:scale-110 transition-transform">
                <Image
                  src="/create-profile-icon.png"
                  alt="Create Profile"
                  width={96}
                  height={96}
                  className="object-contain drop-shadow-md"
                />
              </div>
              <h3 className="text-xl font-semibold mb-3">Create Your Personal Profile</h3>
              <p className="text-muted-foreground leading-relaxed">
                Share your skills, experience, salary expectations, ideal location, and the company values that matter to you. In just minutes, Jobento transforms this data into a precise professional fingerprint uniquely tailored to your goals.
              </p>
            </GlassCard>

            {/* Feature 2 */}
            <GlassCard intensity="medium" neonBorder className="p-8 group hover:scale-105 transition-transform duration-300 flex flex-col items-center text-center">
              <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-xl bg-transparent shadow-none group-hover:scale-110 transition-transform">
                <Image
                  src="/matches-icon.png"
                  alt="AI Matches"
                  width={96}
                  height={96}
                  className="object-contain drop-shadow-md"
                />
              </div>
              <h3 className="text-xl font-semibold mb-3">Get Your AI-Driven Matches</h3>
              <p className="text-muted-foreground leading-relaxed">
                No endless scrolling. No generic listings. Jobento scans thousands of opportunities and surfaces only the ones that align with your profile—ranked using intelligent criteria weighted by what matters most to you.
              </p>
            </GlassCard>

            {/* Feature 3 */}
            <GlassCard intensity="medium" neonBorder className="p-8 group hover:scale-105 transition-transform duration-300 flex flex-col items-center text-center">
              <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-xl bg-transparent shadow-none group-hover:scale-110 transition-transform">
                <Image
                  src="/apply-icon.png"
                  alt="Apply with Confidence"
                  width={96}
                  height={96}
                  className="object-contain drop-shadow-md"
                />
              </div>
              <h3 className="text-xl font-semibold mb-3">Apply with Confidence</h3>
              <p className="text-muted-foreground leading-relaxed">
                Target the roles where you're a top candidate. Jobento provides deep matching insights so you know exactly why you're a good fit, helping you tailor your application and land the interview.
              </p>
            </GlassCard>
          </div>
        </div>
      </section>



      {/* Visual Demo Section */}
      <section className="py-32 lg:py-48 bg-gradient-to-b from-background via-primary/5 to-background overflow-hidden relative">
        <div className="absolute inset-0 bg-primary/5 blur-3xl opacity-50" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl mb-4">See How Jobento Matches You to the Right Jobs</h2>
            <p className="text-lg text-muted-foreground">
              Get Matched to Your Dream Job
            </p>
          </div>

          <div className="mx-auto max-w-5xl relative">
            <GlassCard intensity="medium" className="p-1 rounded-2xl overflow-hidden border-white/10 shadow-2xl">
              <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
                <iframe
                  className="absolute top-0 left-0 w-full h-full rounded-xl"
                  src="https://www.youtube.com/embed/Lhu7OzAbjXs"
                  title="Jobento Demo Video"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </GlassCard>
          </div>
        </div>
      </section>

      {/* Benefits Section - Why Choose */}
      <section className="relative w-full py-20 lg:py-32 overflow-hidden">
        {/* Asymmetrical radial gradient background */}
        <div
          className="absolute inset-0 -z-10 pointer-events-none"
          style={{
            background: `
              radial-gradient(
                800px circle at 20% 30%,
                rgba(59,130,246,0.12),
                transparent 60%
              ),
              radial-gradient(
                600px circle at 80% 60%,
                rgba(245,158,11,0.06),
                transparent 55%
              ),
              #F8FAFC
            `
          }}
        />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl mb-6">
                Why Job Seekers Choose Jobento
              </h2>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                Stop applying to hundreds of jobs blindly. Jobento uses intelligent matching to spotlight the opportunities where you're most likely to succeed—so you can invest your time and energy where it truly counts.
              </p>
              <ul className="space-y-8">
                {[
                  { imageSrc: "/data-driven-icon.png", title: "Data-Driven, Not Guesswork", text: "Match scores with transparent explanations—know exactly why a job fits you." },
                  { imageSrc: "/multi-dimensional-icon.png", title: "Multi-Dimensional Analysis", text: "We weigh skills, experience, location, salary, and culture to find your perfect fit." },
                  { imageSrc: "/command-center-icon.png", title: "Your Career Command Center", text: "Organize, track, and manage your applications in one intuitive dashboard." },
                ].map((benefit, idx) => (
                  <li key={idx} className="flex items-start gap-5">
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-primary/10 border border-primary/20 overflow-hidden shadow-sm">
                      {benefit.imageSrc ? (
                        <Image src={benefit.imageSrc} alt={benefit.title} width={56} height={56} className="object-contain p-1.5" />
                      ) : (
                        // @ts-ignore
                        benefit.icon && <benefit.icon className="h-6 w-6 text-primary" />
                      )}
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground mb-1 text-lg">{benefit.title}</h4>
                      <p className="text-muted-foreground text-sm leading-relaxed">{benefit.text}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative">
              <GlassCard intensity="strong" neonBorder className="p-8 shadow-2xl">
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-muted-foreground">Overall Match</span>
                    <span className="text-3xl font-bold text-primary">
                      <AnimatedCounter end={87} suffix="%" />
                    </span>
                  </div>
                  <div className="h-3 w-full overflow-hidden rounded-full bg-muted">
                    <div className="h-full w-[87%] bg-gradient-to-r from-primary to-secondary rounded-full transition-all duration-1000" />
                  </div>
                </div>
                <div className="space-y-4">
                  {[
                    { label: "Skills Fit", score: 92, color: "bg-chart-2" },
                    { label: "Experience Level", score: 85, color: "bg-primary" },
                    { label: "Location Match", score: 100, color: "bg-chart-3" },
                    { label: "Salary Range", score: 75, color: "bg-chart-4" },
                    { label: "Company's Culture", score: 88, color: "bg-chart-5" },
                  ].map((item) => (
                    <div key={item.label}>
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-sm text-muted-foreground">{item.label}</span>
                        <span className="text-sm font-semibold">
                          <AnimatedCounter end={item.score} suffix="%" />
                        </span>
                      </div>
                      <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
                        <div className={`h-full ${item.color} rounded-full transition-all duration-1000`} style={{ width: `${item.score}%` }} />
                      </div>
                    </div>
                  ))}
                  <div className="pt-2 text-center">
                    <span className="text-xs font-medium text-muted-foreground">+ other criterias</span>
                  </div>
                </div>
              </GlassCard>
            </div>
          </div >
        </div >
      </section >

      {/* Social Proof & KPI Section */}
      <section className="bg-background w-full py-12 lg:py-16 text-center">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xl font-medium text-muted-foreground mb-16">
            Trusted by <span className="text-foreground font-bold">+1700</span> early job seekers
          </p>

          <div className="max-w-5xl mx-auto">
            <h2 className="text-2xl font-bold tracking-tight text-center sm:text-3xl mb-12">
              Built for Better Results with <span className="text-primary">AI-powered matching</span>
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <GlassCard className="p-6 text-center flex flex-col items-center justify-center gap-2" intensity="light">
                <div className="text-4xl font-bold text-foreground">
                  <AnimatedCounter end={3500} suffix="+" />
                </div>
                <p className="text-muted-foreground font-medium">Jobs analyzed daily</p>
              </GlassCard>
              <GlassCard className="p-6 text-center flex flex-col items-center justify-center gap-2" intensity="light">
                <div className="text-4xl font-bold text-foreground">
                  <AnimatedCounter end={300} suffix="+" />
                </div>
                <p className="text-muted-foreground font-medium">Jobs matched</p>
              </GlassCard>
              <GlassCard className="p-6 text-center flex flex-col items-center justify-center gap-2" intensity="light">
                <div className="text-4xl font-bold text-foreground">
                  24/7
                </div>
                <p className="text-muted-foreground font-medium">Job scanning</p>
              </GlassCard>
            </div>
          </div>
        </div>
      </section>





      {/* FAQ Section */}
      <section className="relative w-full py-20 lg:py-32 overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 -z-10 pointer-events-none">
          <div className="absolute top-0 left-[-10%] w-[500px] h-[500px] bg-primary/10 rounded-full blur-[100px] animate-pulse" />
          <div className="absolute bottom-0 right-[-10%] w-[600px] h-[600px] bg-secondary/10 rounded-full blur-[100px] animate-pulse delay-1000" />
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold tracking-tight text-center sm:text-4xl mb-12">Frequently Asked Questions</h2>
            <div className="max-w-3xl mx-auto">
              <FAQAccordion />
            </div>
          </div>
        </div>
      </section>



      {/* Footer */}
      <footer className="border-t border-border bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid md:grid-cols-5 gap-8">
            <div className="md:col-span-2">
              <Link href="/" className="flex items-center gap-2 mb-4 group">
                <div className="relative h-12 w-[280px] transition-transform group-hover:scale-105">
                  <Image
                    src="/jobento-logo.png"
                    alt="Jobento"
                    fill
                    className="object-contain object-left"
                  />
                </div>
              </Link>
              <p className="text-sm text-muted-foreground max-w-sm">
                AI-powered job matching platform that connects you with opportunities aligned with your career goals.
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-3">Product</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/" className="text-muted-foreground hover:text-foreground transition-colors">
                    Overview
                  </Link>
                </li>
                <li>
                  <Link href="/#how-it-works" className="text-muted-foreground hover:text-foreground transition-colors">
                    How It Works
                  </Link>
                </li>
                <li>
                  <span className="text-muted-foreground">Pricing</span>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-3">Company</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <span className="text-muted-foreground">About Us</span>
                </li>
                <li>
                  <span className="text-muted-foreground">Contact</span>
                </li>
                <li>
                  <Link href="/terms-of-service" className="text-muted-foreground hover:text-foreground transition-colors">
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link href="/privacy-policy" className="text-muted-foreground hover:text-foreground transition-colors">
                    Privacy Policy
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-3">Social</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <span className="text-muted-foreground">Instagram</span>
                </li>
                <li>
                  <span className="text-muted-foreground">YouTube</span>
                </li>
                <li>
                  <span className="text-muted-foreground">TikTok</span>
                </li>
                <li>
                  <span className="text-muted-foreground">LinkedIn</span>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-border text-center text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Jobento. All rights reserved.
          </div>
        </div>
      </footer >
      <ScrollToTop />
    </PageTransition >
  )
}
