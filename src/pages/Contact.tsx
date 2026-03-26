import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Contact = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // placeholder
    alert("Message envoyé !");
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container px-6 pt-32 pb-20">
        <div className="max-w-2xl">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-px w-12 bg-foreground" />
            <span className="text-xs font-body uppercase tracking-[0.3em] text-muted-foreground">
              Me contacter
            </span>
          </div>

          <h1 className="font-heading text-5xl sm:text-6xl md:text-7xl leading-[0.9] text-foreground mb-6">
            Discutons de<br />
            votre <span className="italic text-primary">projet</span>
            <span className="text-secondary">.</span>
          </h1>

          <p className="text-base font-body text-muted-foreground leading-relaxed mb-12">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor 
            incididunt ut labore et dolore magna aliqua.
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-xs font-body uppercase tracking-widest text-muted-foreground mb-2">
                Nom
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
                className="w-full bg-transparent border-b border-border py-3 text-foreground font-body focus:outline-none focus:border-primary transition-colors placeholder:text-muted-foreground/50"
                placeholder="Lorem Ipsum"
              />
            </div>
            <div>
              <label className="block text-xs font-body uppercase tracking-widest text-muted-foreground mb-2">
                Email
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
                className="w-full bg-transparent border-b border-border py-3 text-foreground font-body focus:outline-none focus:border-primary transition-colors placeholder:text-muted-foreground/50"
                placeholder="lorem@ipsum.com"
              />
            </div>
            <div>
              <label className="block text-xs font-body uppercase tracking-widest text-muted-foreground mb-2">
                Message
              </label>
              <textarea
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                required
                rows={5}
                className="w-full bg-transparent border-b border-border py-3 text-foreground font-body focus:outline-none focus:border-primary transition-colors resize-none placeholder:text-muted-foreground/50"
                placeholder="Dolor sit amet consectetur..."
              />
            </div>
            <button
              type="submit"
              className="px-8 py-3 bg-foreground text-background text-xs font-body uppercase tracking-widest hover:opacity-80 transition-opacity"
            >
              Envoyer
            </button>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Contact;
