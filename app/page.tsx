import Link from "next/link"
import { Button } from "@/components/ui/button"
import { GlassCard } from "@/components/ui/glass-card"
import { AnimatedText } from "@/components/ui/animated-text"
import { AnimatedCounter } from "@/components/ui/animated-counter"
import { ArrowRight, Waypoints, BarChart3, Sparkles, CheckCircle2, Users, TrendingUp, Zap, Shield, Rocket, Target } from "lucide-react"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary shadow-[0_0_20px_rgba(61,124,255,0.4)]">
                <Waypoints className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold text-foreground">JobVector</span>
            </Link>
            <div className="flex items-center gap-4">
              <Link href="/personal-profile">
                <Button variant="neon" size="sm">Get Started Free</Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative container mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-10 lg:pt-32 lg:pb-12 overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-primary/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/20 rounded-full blur-3xl animate-pulse delay-1000" />
        </div>

        <div className="mx-auto max-w-4xl text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-primary/10 border border-primary/20 px-4 py-2 text-sm font-medium text-primary backdrop-blur-sm">
            <Sparkles className="h-4 w-4" />
            AI-Powered Career Navigation
          </div>
          <h1 className="mb-6 text-4xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
            Land Your Dream Job in{" "}
            <AnimatedText
              text="Weeks, Not Months"
              gradient={true}
              className="inline-block"
            />
          </h1>
          <p className="mb-8 text-lg text-muted-foreground sm:text-xl lg:text-2xl leading-relaxed max-w-3xl mx-auto">
            Stop applying blindly. Start matching intelligently. Your dream job is out there.
          </p>
          <div className="flex flex-col items-center gap-6">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/personal-profile">
                <Button size="lg" variant="neon" className="h-12 px-8 text-base group shadow-[0_0_30px_rgba(61,124,255,0.4)] hover:shadow-[0_0_40px_rgba(61,124,255,0.6)]">
                  Get Started Free
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>

            </div>
            <div className="flex items-center gap-6 text-sm text-muted-foreground/80">
              <span className="flex items-center gap-1.5"><CheckCircle2 className="h-4 w-4 text-primary" /> No credit card required</span>
              <span className="flex items-center gap-1.5"><CheckCircle2 className="h-4 w-4 text-primary" /> Set up in 3 minutes</span>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section - How It Works */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-20 lg:pt-12 lg:pb-32">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl mb-4">How JobVector Works</h2>
          <p className="text-lg text-muted-foreground">
            Three simple steps to find your dream job with data-driven insights
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
          {/* Feature 1 */}
          <GlassCard intensity="medium" neonBorder className="p-8 group hover:scale-105 transition-transform duration-300 flex flex-col items-center text-center">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-xl bg-transparent text-primary shadow-none group-hover:scale-110 transition-transform">
              <Rocket className="h-10 w-10" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Create Your Personal Profile</h3>
            <p className="text-muted-foreground leading-relaxed">
              Share your skills, experience, salary expectations, ideal location, and the company values that matter to you. In just minutes, JobVector transforms this data into a precise professional fingerprint uniquely tailored to your goals.
            </p>
          </GlassCard>

          {/* Feature 2 */}
          <GlassCard intensity="medium" neonBorder className="p-8 group hover:scale-105 transition-transform duration-300 flex flex-col items-center text-center">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-xl bg-transparent text-secondary shadow-none group-hover:scale-110 transition-transform">
              <BarChart3 className="h-10 w-10" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Get Your AI-Driven Matches</h3>
            <p className="text-muted-foreground leading-relaxed">
              No endless scrolling. No generic listings. JobVector scans thousands of opportunities and surfaces only the ones that align with your profile—ranked using intelligent criteria weighted by what matters most to you.
            </p>
          </GlassCard>

          {/* Feature 3 */}
          <GlassCard intensity="medium" neonBorder className="p-8 group hover:scale-105 transition-transform duration-300 flex flex-col items-center text-center">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-xl bg-transparent text-chart-3 shadow-none group-hover:scale-110 transition-transform">
              <TrendingUp className="h-10 w-10" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Analyze and Apply with Confidence</h3>
            <p className="text-muted-foreground leading-relaxed">
              Review detailed breakdowns of each match score with crystal-clear explanations: Why do you fit this role? Where do you stand out? Where's room to grow? Save opportunities, compare them side-by-side, and apply when it feels right. All with complete confidence.
            </p>
          </GlassCard>
        </div>
      </section>



      {/* Visual Demo Section */}
      <section className="border-y border-border bg-black/40 py-20 lg:py-32 overflow-hidden relative">
        <div className="absolute inset-0 bg-primary/5 blur-3xl" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl mb-4">See JobVector in Action</h2>
            <p className="text-lg text-muted-foreground">
              Watch how our AI distills thousands of data points into your perfect match score.
            </p>
          </div>

          <div className="mx-auto max-w-5xl relative">
            <GlassCard intensity="medium" className="p-1 rounded-2xl overflow-hidden border-white/10 shadow-2xl">
              <div className="bg-background/80 backdrop-blur-xl p-8 rounded-xl relative overflow-hidden min-h-[400px] flex items-center justify-center">
                {/* Visual Mockup - Scanning Effect */}
                <div className="relative w-full max-w-md mx-auto aspect-[3/4] md:aspect-[4/3] bg-card rounded-lg border border-border shadow-2xl p-6 flex flex-col gap-4">
                  {/* Header */}
                  <div className="flex items-center justify-between pb-4 border-b border-border">
                    <div className="h-4 w-24 bg-muted rounded animate-pulse" />
                    <div className="h-8 w-8 rounded-full bg-primary/20 animate-pulse" />
                  </div>
                  {/* Content */}
                  <div className="space-y-3">
                    <div className="h-6 w-3/4 bg-muted rounded animate-pulse" />
                    <div className="h-4 w-1/2 bg-muted/50 rounded animate-pulse" />
                    <div className="flex gap-2 pt-2">
                      <div className="h-6 w-16 bg-blue-500/20 rounded-full animate-pulse" />
                      <div className="h-6 w-16 bg-purple-500/20 rounded-full animate-pulse" />
                    </div>
                  </div>
                  {/* Scanning Line */}
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/10 to-transparent h-[50%] w-full animate-[scan_3s_ease-in-out_infinite] pointer-events-none" />

                  {/* Match Popover Mock */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-background/90 backdrop-blur-md border border-primary/50 shadow-[0_0_30px_rgba(61,124,255,0.3)] p-6 rounded-xl text-center animate-in fade-in zoom-in duration-700 slide-in-from-bottom-4 delay-1000 fill-mode-forwards opacity-0 flex flex-col items-center">
                    <div className="text-4xl font-bold text-primary mb-1">94%</div>
                    <div className="text-sm font-medium text-muted-foreground">Match Score</div>
                    <Button size="sm" variant="neon" className="mt-4 w-full">View Details</Button>
                  </div>
                </div>
              </div>
            </GlassCard>
          </div>
        </div>
      </section>

      {/* Benefits Section - Why Choose */}
      <section className="bg-muted/30 py-20 lg:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl mb-6">
                What Makes JobVector Different
              </h2>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                Stop applying to hundreds of jobs blindly. JobVector uses intelligent matching to spotlight the opportunities where you're most likely to succeed—so you can invest your time and energy where it truly counts.
              </p>
              <ul className="space-y-6">
                {[
                  { icon: Zap, title: "Data-Driven, Not Guesswork", text: "Match scores with transparent explanations—know exactly why a job fits you." },
                  { icon: Target, title: "Multi-Dimensional Analysis", text: "We weigh skills, experience, location, salary, and culture to find your perfect fit." },
                  { icon: Shield, title: "Your Career Command Center", text: "Organize, track, and manage your applications in one intuitive dashboard." },
                ].map((benefit, idx) => (
                  <li key={idx} className="flex items-start gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 border border-primary/20">
                      <benefit.icon className="h-5 w-5 text-primary" />
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

      {/* Testimonials Section */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
        <h2 className="text-3xl font-bold tracking-tight text-center sm:text-4xl mb-16">
          Success Stories from JobVector Users
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              quote: "JobVector's matching algorithm found positions I never would have discovered on my own. I landed my current role in just 2 weeks!",
              author: "Sarah Chen",
              role: "Product Manager @ TechCorp",
              image: "SC",
              color: "bg-blue-600"
            },
            {
              quote: "The transparent scoring helped me understand exactly where I fit. No more guessing games or wasted applications.",
              author: "Marcus Johnson",
              role: "Senior Developer @ StartupX",
              image: "MJ",
              color: "bg-emerald-600"
            },
            {
              quote: "Finally, a platform that values cultural fit as much as skills. I found a company that aligns with my values.",
              author: "Elena Rodriguez",
              role: "UX Designer @ DesignStudio",
              image: "ER",
              color: "bg-purple-600"
            }
          ].map((testimonial, i) => (
            <GlassCard key={i} intensity="light" className="p-6 md:p-8 flex flex-col h-full hover:scale-105 transition-all duration-300">
              <div className="flex gap-1 text-amber-400 mb-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg key={star} className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <blockquote className="text-lg mb-6 flex-1 leading-relaxed italic text-muted-foreground">"{testimonial.quote}"</blockquote>
              <div className="flex items-center gap-4 mt-auto">
                <div className={`h-10 w-10 rounded-full ${testimonial.color} flex items-center justify-center text-white font-bold text-sm shadow-md`}>
                  {testimonial.image}
                </div>
                <div>
                  <div className="font-bold text-foreground">{testimonial.author}</div>
                  <div className="text-xs text-primary font-medium">{testimonial.role}</div>
                </div>
              </div>
            </GlassCard>
          ))}
        </div>
      </section>



      {/* Who It Is For Section */}
      <section className="border-y border-border bg-muted/20 py-20 lg:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">Built for Every Career Stage</h2>
            <p className="text-lg text-muted-foreground">Whether you're starting out or stepping up, JobVector adapts to your unique professional journey.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <GlassCard className="p-8 text-center" intensity="light">
              <div className="mx-auto h-14 w-14 rounded-full bg-blue-500/10 flex items-center justify-center text-3xl mb-6">🎓</div>
              <h3 className="text-xl font-bold mb-3">Recent Graduates</h3>
              <p className="text-muted-foreground">Find entry-level roles that value your fresh perspective and transferable skills, not just years of experience.</p>
            </GlassCard>
            <GlassCard className="p-8 text-center" intensity="light">
              <div className="mx-auto h-14 w-14 rounded-full bg-purple-500/10 flex items-center justify-center text-3xl mb-6">🔄</div>
              <h3 className="text-xl font-bold mb-3">Career Changers</h3>
              <p className="text-muted-foreground">Discover opportunities where your unique background becomes your competitive advantage.</p>
            </GlassCard>
            <GlassCard className="p-8 text-center" intensity="light">
              <div className="mx-auto h-14 w-14 rounded-full bg-emerald-500/10 flex items-center justify-center text-3xl mb-6">📈</div>
              <h3 className="text-xl font-bold mb-3">Senior Professionals</h3>
              <p className="text-muted-foreground">Connect with companies seeking your specific expertise and leadership experience.</p>
            </GlassCard>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold tracking-tight text-center sm:text-4xl mb-12">Frequently Asked Questions</h2>
          <div className="space-y-6">
            {[
              { q: "How does the matching algorithm work?", a: "JobVector uses multi-dimensional analysis to compare your profile against job requirements. We evaluate skills alignment, experience level, location preferences, salary expectations, and cultural fit to generate a comprehensive match score." },
              { q: "Is my data private and secure?", a: "Absolutely. Your data is encrypted, never shared with third parties without your consent, and you control what information employers see. We are GDPR compliant." },
              { q: "Is JobVector free to use?", a: "Yes! Creating your profile and browsing matched opportunities is completely free. No credit card required." },
              { q: "How accurate are the match scores?", a: "Our algorithm achieves 87% accuracy in predicting job fit based on user feedback. Scores above 80% indicate strong alignment." },
            ].map((faq, i) => (
              <GlassCard key={i} intensity="light" className="p-6">
                <h3 className="font-bold text-lg mb-2">{faq.q}</h3>
                <p className="text-muted-foreground leading-relaxed">{faq.a}</p>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32 border-t border-border">
        <div className="mx-auto max-w-3xl text-center">
          <Users className="mx-auto h-12 w-12 text-primary mb-6" />
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl mb-6">
            Ready to Find Your Perfect Match?
          </h2>
          <p className="text-lg text-muted-foreground mb-10 leading-relaxed">
            Create your job seeker profile in minutes and start discovering opportunities that align with your career
            goals.
          </p>
          <div className="flex flex-col items-center gap-6">
            <Link href="/personal-profile">
              <Button size="lg" variant="neon" className="h-14 px-10 text-lg group">
                Get Started Free
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
            <div className="flex items-center gap-4 text-xs font-medium text-muted-foreground uppercase tracking-wide">
              <span className="flex items-center gap-1.5"><Shield className="h-3 w-3" /> Bank-level Encryption</span>
              <span className="flex items-center gap-1.5"><CheckCircle2 className="h-3 w-3" /> GDPR Compliant</span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid md:grid-cols-5 gap-8">
            <div className="md:col-span-2">
              <Link href="/" className="flex items-center gap-2 mb-4">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary shadow-[0_0_15px_rgba(61,124,255,0.3)]">
                  <Waypoints className="h-5 w-5 text-primary-foreground" />
                </div>
                <span className="text-xl font-bold text-foreground">JobVector</span>
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
            &copy; {new Date().getFullYear()} JobVector. All rights reserved.
          </div>
        </div>
      </footer>
    </div >
  )
}
