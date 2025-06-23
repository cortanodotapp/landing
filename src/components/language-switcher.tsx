"use client"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import ReactCountryFlag from "react-country-flag"
import { useLocale } from 'next-intl'
import { useRouter, usePathname } from 'next/navigation'
import { locales, type Locale } from '@/i18n/config'

// Define the supported languages with their country codes and locale mapping
const languages = [
  { code: "US", locale: "en" as const, name: "English", nativeName: "English" },
  { code: "PL", locale: "pl" as const, name: "Polish", nativeName: "Polski" },
  { code: "ES", locale: "es" as const, name: "Spanish", nativeName: "Español" },
  { code: "DE", locale: "de" as const, name: "German", nativeName: "Deutsch" },
]

// Flag components using react-country-flag
const LargeFlag = ({ countryCode }: { countryCode: string }) => (
  <div className="w-full h-full rounded-full overflow-hidden shadow-lg relative">
    <ReactCountryFlag
      countryCode={countryCode}
      svg
      style={{
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        borderRadius: '50%',
      }}
    />
  </div>
)

const SmallFlag = ({ countryCode }: { countryCode: string }) => (
  <div className="w-6 h-6 rounded-full overflow-hidden shadow-sm relative">
    <ReactCountryFlag
      countryCode={countryCode}
      svg
      style={{
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        borderRadius: '50%',
      }}
    />
  </div>
)

export function LanguageSwitcher() {
  const locale = useLocale() as Locale
  const router = useRouter()
  const pathname = usePathname()
  
  const currentLanguage = languages.find(lang => lang.locale === locale) || languages[0]
  
  const handleLanguageChange = (newLocale: Locale) => {
    // Remove current locale from pathname and add new locale
    const pathWithoutLocale = pathname.replace(`/${locale}`, '') || '/'
    const newPath = `/${newLocale}${pathWithoutLocale === '/' ? '' : pathWithoutLocale}`
    router.push(newPath)
  }
  
  return (
    <div className="fixed bottom-6 right-6 z-50">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            size="lg"
            className="h-14 w-14 rounded-full hover:bg-white/20 transition-all duration-200 shadow-lg hover:shadow-xl p-0 border-0 bg-transparent"
          >
            <LargeFlag countryCode={currentLanguage.code} />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent 
          side="top" 
          align="end" 
          className="mb-2 bg-background/95 backdrop-blur-xl border border-border shadow-xl"
        >
          {languages.map((language) => (
            <DropdownMenuItem 
              key={language.locale}
              onClick={() => handleLanguageChange(language.locale)}
              className="text-foreground hover:bg-accent focus:bg-accent cursor-pointer"
            >
              <div className="mr-3">
                <SmallFlag countryCode={language.code} />
              </div>
              <span className="font-medium">{language.nativeName}</span>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
