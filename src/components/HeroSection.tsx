import gradientBlob from "@/assets/gradient-blob.png";

const HeroSection = () => {
  return (
    <section className="relative pt-32 pb-20 overflow-hidden">
      {/* Decorative blob */}
      <img
        src={gradientBlob}
        alt=""
        width={800}
        height={800}
        className="absolute -top-40 -right-40 w-[600px] opacity-40 pointer-events-none select-none blur-sm"
        aria-hidden="true"
      />
      
      <div className="relative">
        <div className="flex items-center gap-3 mb-6">
          <div className="h-px w-12 bg-foreground" />
          <span className="text-xs font-body uppercase tracking-[0.3em] text-muted-foreground">
            Creative Portfolio — 2024
          </span>
        </div>

        <h1 className="font-heading text-6xl sm:text-7xl md:text-8xl lg:text-9xl leading-[0.9] text-foreground mb-8">
          Design<br />
          <span className="italic text-primary">Créatif</span>
          <span className="text-secondary">.</span>
        </h1>

        <p className="max-w-lg text-base font-body text-muted-foreground leading-relaxed">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor 
          incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud 
          exercitation ullamco laboris.
        </p>

        <div className="flex items-center gap-4 mt-10">
          <span className="text-xs font-body text-muted-foreground uppercase tracking-widest">
            Photographies + Affiches + Sites Web + Réseaux Sociaux + Dessins
          </span>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
