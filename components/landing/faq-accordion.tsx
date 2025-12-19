"use client"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

const faqs = [
    { q: "How does the matching algorithm work?", a: "Jobento uses multi-dimensional analysis to compare your profile against job requirements. We evaluate skills alignment, experience level, location preferences, salary expectations, and cultural fit to generate a comprehensive match score." },
    { q: "Is my data private and secure?", a: "Absolutely. Your data is encrypted, never shared with third parties without your consent, and you control what information employers see. We are GDPR compliant." },
    { q: "Is Jobento free to use?", a: "Yes! Creating your profile and browsing matched opportunities is completely free. No credit card required." },
    { q: "How accurate are the match scores?", a: "Our algorithm achieves 87% accuracy in predicting job fit based on user feedback. Scores above 80% indicate strong alignment." },
]

export function FAQAccordion() {
    return (
        <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, i) => (
                <AccordionItem key={i} value={`item-${i}`} className="border-b border-white/10 px-4">
                    <AccordionTrigger className="text-left text-lg font-semibold hover:no-underline hover:text-primary transition-colors">
                        {faq.q}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground text-base leading-relaxed">
                        {faq.a}
                    </AccordionContent>
                </AccordionItem>
            ))}
        </Accordion>
    )
}
