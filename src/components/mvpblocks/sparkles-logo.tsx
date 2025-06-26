import { SparklesCore } from '@/components/ui/sparkles';

export default function TrustedPartnersSection() {
  return (
    <div className="pt-0 pb-0 relative overflow-hidden">
      <div className="mx-auto max-w-full px-4 md:px-6">
        <div className="mt-0 grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 items-center justify-items-center max-w-5xl mx-auto">
          {/* Google */}
          <div className="flex items-center justify-center w-full opacity-60 hover:opacity-100 transition-opacity">
            <div className="w-32 md:w-36 h-auto">
              <img 
                src="https://upload.cortano.app/brandbird-Google-logotype.svg" 
                alt="Google"
                className="w-full h-auto filter brightness-0 invert opacity-70 hover:opacity-100 transition-all duration-300"
              />
            </div>
          </div>

          {/* Microsoft Azure */}
          <div className="flex items-center justify-center w-full opacity-60 hover:opacity-100 transition-opacity">
            <div className="w-32 md:w-36 h-auto">
              <img 
                src="https://upload.cortano.app/brandbird-Microsoft%20Azure-logotype.svg" 
                alt="Microsoft Azure"
                className="w-full h-auto filter brightness-0 invert opacity-70 hover:opacity-100 transition-all duration-300"
              />
            </div>
          </div>

          {/* OpenAI */}
          <div className="flex items-center justify-center w-full opacity-60 hover:opacity-100 transition-opacity">
            <div className="w-32 md:w-36 h-auto">
              <img 
                src="https://upload.cortano.app/brandbird-OpenAI-logotype.svg" 
                alt="OpenAI"
                className="w-full h-auto filter brightness-0 invert opacity-70 hover:opacity-100 transition-all duration-300"
              />
            </div>
          </div>
        </div>
      </div>

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
