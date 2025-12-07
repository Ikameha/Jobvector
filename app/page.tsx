import Link from "next/link"
import { Button } from "@/components/ui/button"
import { GlassCard } from "@/components/ui/glass-card"
import { AnimatedText } from "@/components/ui/animated-text"
import { AnimatedCounter } from "@/components/ui/animated-counter"
import { ArrowRight, Target, BarChart3, Sparkles, CheckCircle2, Users, TrendingUp, Zap, Shield, Rocket } from "lucide-react"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary shadow-[0_0_20px_rgba(61,124,255,0.4)]">
                <Target className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold text-foreground">Job Pulse</span>
            </Link>
            <div className="flex items-center gap-4">
              <Link href="/personal-profile">
                <Button variant="neon" size="sm">Sign In</Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative container mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32 overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-primary/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/20 rounded-full blur-3xl animate-pulse delay-1000" />
        </div>

        <div className="mx-auto max-w-4xl text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-primary/10 border border-primary/20 px-4 py-2 text-sm font-medium text-primary backdrop-blur-sm">
            <Sparkles className="h-4 w-4" />
            AI-Powered Job Matching
          </div>
          <h1 className="mb-6 text-4xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
            Find Your{" "}
            <AnimatedText
              text="Perfect Job"
              gradient={true}
              className="inline-block"
            />
            {" "}with Intelligent Matching
          </h1>
          <p className="mb-10 text-lg text-muted-foreground sm:text-xl lg:text-2xl leading-relaxed max-w-3xl mx-auto">
            Stop wasting time on irrelevant job listings. Job Pulse uses AI to analyze your skills, experience, and
            preferences to find roles that truly match your profile.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/personal-profile">
              <Button size="lg" variant="neon" className="h-12 px-8 text-base group">
                Sign In
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
            <Link href="/jobs">
              <Button size="lg" variant="glass" className="h-12 px-8 text-base">
                Browse Jobs
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="border-y border-border bg-muted/30 py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center text-center">
            <div>
              <div className="text-3xl font-bold text-foreground">
                <AnimatedCounter end={500} suffix="+" />
              </div>
              <div className="text-sm text-muted-foreground mt-1">Job Listings</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-foreground">
                <AnimatedCounter end={5} />
              </div>
              <div className="text-sm text-muted-foreground mt-1">Match Criteria</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-foreground">
                <AnimatedCounter end={95} suffix="%" />
              </div>
              <div className="text-sm text-muted-foreground mt-1">Match Accuracy</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-foreground">
                <AnimatedCounter end={100} />
              </div>
              <div className="text-sm text-muted-foreground mt-1">Max Score</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section - How It Works */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl mb-4">How Job Pulse Works</h2>
          <p className="text-lg text-muted-foreground">
            Three simple steps to find your dream job with data-driven insights
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
          {/* Feature 1 */}
          <GlassCard intensity="medium" neonBorder className="p-8 group hover:scale-105 transition-transform duration-300">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-[0_0_20px_rgba(61,124,255,0.3)] group-hover:shadow-[0_0_30px_rgba(61,124,255,0.5)] transition-shadow">
              <Rocket className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Create Your Personal Profile</h3>
            <p className="text-muted-foreground leading-relaxed">
              Share your skills, experience, salary expectations, ideal location, and the company values that matter to you. In just minutes, Job Pulse transforms this data into a precise professional fingerprint uniquely tailored to your goals.
            </p>
          </GlassCard>

          {/* Feature 2 */}
          <GlassCard intensity="medium" neonBorder className="p-8 group hover:scale-105 transition-transform duration-300">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-secondary text-secondary-foreground shadow-[0_0_20px_rgba(0,225,255,0.3)] group-hover:shadow-[0_0_30px_rgba(0,225,255,0.5)] transition-shadow">
              <BarChart3 className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Get Your AI-Driven Matches</h3>
            <p className="text-muted-foreground leading-relaxed">
              No endless scrolling. No generic listings. Job Pulse scans thousands of opportunities and surfaces only the ones that align with your profile—ranked using intelligent criteria weighted by what matters most to you.
            </p>
          </GlassCard>

          {/* Feature 3 */}
          <GlassCard intensity="medium" neonBorder className="p-8 group hover:scale-105 transition-transform duration-300">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-chart-3 text-white shadow-[0_0_20px_rgba(124,58,237,0.3)] group-hover:shadow-[0_0_30px_rgba(124,58,237,0.5)] transition-shadow">
              <TrendingUp className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Analyze and Apply with Confidence</h3>
            <p className="text-muted-foreground leading-relaxed">
              Review detailed breakdowns of each match score with crystal-clear explanations: Why do you fit this role? Where do you stand out? Where's room to grow? Save opportunities, compare them side-by-side, and apply when it feels right. All with complete confidence.
            </p>
          </GlassCard>
        </div>
      </section>

      {/* Benefits Section - Why Choose */}
      <section className="bg-muted/30 py-20 lg:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl mb-6">
                What Makes Job Pulse Different
              </h2>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                Stop applying to hundreds of jobs blindly. Job Pulse uses intelligent matching to spotlight the opportunities where you're most likely to succeed—so you can invest your time and energy where it truly counts.
              </p>
              <ul className="space-y-4">
                {[
                  { icon: Zap, title: "Data-Driven Clarity", text: "Get match scores with transparent explanations—no black box algorithms, just clear insights into why each job fits." },
                  { icon: Target, title: "Multi-Dimensional Analysis", text: "We evaluate what really matters: skills alignment, experience level, location preferences, salary expectations, and cultural fit." },
                  { icon: Shield, title: "Your Personal Command Center", text: "Save, organize, and track your best opportunities in one intuitive dashboard designed around your job search workflow." },
                  { icon: CheckCircle2, title: "Zero Guesswork", text: "Instantly see how well any position aligns with your profile and where you shine brightest." },
                ].map((benefit, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <benefit.icon className="h-6 w-6 text-primary shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-foreground mb-1">{benefit.title}</h4>
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
                </div>
              </GlassCard>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
        <div className="mx-auto max-w-3xl text-center">
          <Users className="mx-auto h-12 w-12 text-primary mb-6" />
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl mb-6">
            Ready to Find Your Perfect Match?
          </h2>
          <p className="text-lg text-muted-foreground mb-10 leading-relaxed">
            Create your job seeker profile in minutes and start discovering opportunities that align with your career
            goals.
          </p>
          <Link href="/personal-profile">
            <Button size="lg" variant="neon" className="h-14 px-10 text-lg group">
              Get Started Free
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid md:grid-cols-5 gap-8">
            <div className="md:col-span-2">
              <Link href="/" className="flex items-center gap-2 mb-4">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary shadow-[0_0_15px_rgba(61,124,255,0.3)]">
                  <Target className="h-5 w-5 text-primary-foreground" />
                </div>
                <span className="text-xl font-bold text-foreground">Job Pulse</span>
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
                  <span className="text-muted-foreground">Terms of Service</span>
                </li>
                <li>
                  <span className="text-muted-foreground">Privacy Policy</span>
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
            &copy; {new Date().getFullYear()} Job Pulse. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  )
}
