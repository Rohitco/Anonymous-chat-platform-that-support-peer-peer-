import { Quote } from "lucide-react";

export function Testimonials() {
  const testimonials = [
    {
      quote: "Finding a space where I could share without judgment changed everything. I finally felt heard.",
      author: "Anonymous",
      role: "Community Member",
    },
    {
      quote: "The AI companion helped me through my darkest nights when I couldn't sleep. It was like having a friend who's always there.",
      author: "Anonymous",
      role: "Regular User",
    },
    {
      quote: "Connecting with peers who understood my struggles made me realize I'm not alone in this journey.",
      author: "Anonymous",
      role: "Peer Supporter",
    },
  ];

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
            Stories of Hope
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Real experiences from our community. Your story could be next.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index} 
              className="bg-gradient-card rounded-2xl p-8 shadow-card hover:shadow-elevated transition-all duration-300 relative"
            >
              <Quote className="w-10 h-10 text-primary/20 mb-4" />
              <p className="text-foreground leading-relaxed mb-6 italic">
                "{testimonial.quote}"
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-primary font-semibold">
                    {testimonial.author[0]}
                  </span>
                </div>
                <div>
                  <p className="font-semibold text-foreground text-sm">{testimonial.author}</p>
                  <p className="text-muted-foreground text-xs">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
