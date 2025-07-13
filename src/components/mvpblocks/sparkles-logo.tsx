import { SparklesCore } from '@/components/ui/sparkles';

export default function TrustedPartnersSection() {
  return (
    <div className="pt-0 pb-0 relative overflow-hidden">
      <div className="relative -mt-8 h-64 w-full overflow-hidden before:absolute before:left-0 before:top-0 before:h-full before:w-20 before:bg-gradient-to-r before:from-background before:to-transparent before:z-10 after:absolute after:right-0 after:top-0 after:h-full after:w-20 after:bg-gradient-to-l after:from-background after:to-transparent after:z-10">
        {/* Background gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-primary/15 via-primary/5 to-transparent opacity-50" />
        
        {/* Sparkles with improved fade effect */}
        <SparklesCore
          id="tsparticles"
          background="transparent"
          particleDensity={150}
          particleColor="#22c55e"
          minSize={0.4}
          maxSize={1.8}
          speed={1.5}
          className="absolute inset-0 h-full w-full [mask-image:linear-gradient(to_top,black_0%,black_30%,rgba(0,0,0,0.9)_50%,rgba(0,0,0,0.6)_70%,rgba(0,0,0,0.3)_85%,transparent_100%)]"
        />
        
        {/* Additional subtle overlay for smooth blending */}
        <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />
        
        {/* Bottom curve element */}
        <div className="absolute -left-1/2 top-1/2 aspect-[1/0.7] w-[200%] rounded-[100%] border-t border-primary/10 bg-background" />
      </div>
    </div>
  );
}
