const Footer = () => {
  return (
    <footer className="border-t border-border py-8 mt-20">
      <div className="container px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <span className="font-heading text-lg text-foreground">Portfolio</span>
        <span className="text-xs font-body text-muted-foreground tracking-wider uppercase">
          © 2024 — Tous droits réservés
        </span>
      </div>
    </footer>
  );
};

export default Footer;
