import { MessageSquare, Sparkles, UserCheck } from "lucide-react";

export function HowItWorks() {
  const steps = [
    {
      icon: <UserCheck className="w-6 h-6" />,
      title: "Stay Anonymous",
      description: "No registration needed. Just enter and start chatting with complete privacy.",
      color: "primary",
    },
    {
      icon: <MessageSquare className="w-6 h-6" />,
      title: "Choose Your Support",
      description: "Connect with peers who understand, or chat with our compassionate AI companion.",
      color: "calm-blue",
    },
    {
      icon: <Sparkles className="w-6 h-6" />,
      title: "Feel Supported",
      description: "Share freely, get support, and know that you're never alone in your journey.",
      color: "accent",
    },
  ];

  return (
    <section className="py-24 bg-gradient-calm">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
            How It Works
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Getting support has never been easier. Three simple steps to feeling better.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 relative">
            {/* Connection line */}
            <div className="hidden md:block absolute top-12 left-[20%] right-[20%] h-0.5 bg-gradient-to-r from-primary/30 via-calm-blue/30 to-accent/30" />
            
            {steps.map((step, index) => (
              <div key={index} className="relative">
                <div className="flex flex-col items-center text-center">
                  {/* Step number */}
                  <div className={`w-24 h-24 rounded-3xl flex items-center justify-center mb-6 shadow-card relative z-10
                    ${step.color === 'primary' ? 'bg-primary/10 text-primary' : ''}
                    ${step.color === 'calm-blue' ? 'bg-calm-blue/20 text-calm-blue' : ''}
                    ${step.color === 'accent' ? 'bg-accent/20 text-accent' : ''}
                  `}>
                    {step.icon}
                    <span className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-background shadow-soft flex items-center justify-center font-display font-bold text-foreground">
                      {index + 1}
                    </span>
                  </div>
                  
                  <h3 className="font-display font-semibold text-xl text-foreground mb-3">
                    {step.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
