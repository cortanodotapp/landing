# Feature Coming Soon Dialog Component

A clean, concise dialog component designed to inform users about upcoming features while collecting newsletter subscriptions.

## Features

- 🎨 **Consistent Design**: Matches your existing design system with primary colors and animations
- 📧 **Newsletter Integration**: Built-in email collection with form validation
- ⚡ **Smooth Animations**: Framer Motion animations for enhanced UX
- 🪝 **Easy Hook**: Optional hook for programmatic control
- ♿ **Accessible**: Built on Radix UI primitives with proper ARIA labels
- 🎯 **Concise Messaging**: Simple, direct communication about feature availability

## Basic Usage

### As a Wrapper Component

```tsx
import { FeatureComingSoonDialog } from "@/components/ui/feature-coming-soon-dialog"
import { Button } from "@/components/ui/button"

function MyComponent() {
  return (
    <FeatureComingSoonDialog featureName="Advanced Analytics">
      <Button>View Analytics</Button>
    </FeatureComingSoonDialog>
  )
}
```

### With Custom Trigger

```tsx
import { FeatureComingSoonDialog } from "@/components/ui/feature-coming-soon-dialog"

function MyComponent() {
  return (
    <FeatureComingSoonDialog featureName="API Integrations">
      <div className="cursor-pointer p-4 border rounded-lg hover:bg-gray-50">
        <h3>API Access</h3>
        <p>Coming Soon</p>
      </div>
    </FeatureComingSoonDialog>
  )
}
```

### Using the Hook for Programmatic Control

```tsx
import { useFeatureComingSoon } from "@/components/ui/feature-coming-soon-dialog"
import { Button } from "@/components/ui/button"

function MyComponent() {
  const { openDialog, closeDialog, ...dialogState } = useFeatureComingSoon()

  const handleFeatureClick = () => {
    openDialog("Custom Voice Cloning")
  }

  return (
    <>
      <Button onClick={handleFeatureClick}>
        Try Voice Cloning
      </Button>
      
      <FeatureComingSoonDialog
        {...dialogState}
        onOpenChange={closeDialog}
      >
        <div /> {/* Empty trigger since we're controlling it programmatically */}
      </FeatureComingSoonDialog>
    </>
  )
}
```

## Props

### FeatureComingSoonDialog

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `children` | `React.ReactNode` | ✅ | The trigger element that opens the dialog |
| `featureName` | `string` | ✅ | Name of the upcoming feature |
| `open` | `boolean` | ❌ | Controlled open state |
| `onOpenChange` | `(open: boolean) => void` | ❌ | Callback when open state changes |

### useFeatureComingSoon Hook

Returns an object with:
- `open`: Current open state
- `featureName`: Current feature name
- `openDialog(name)`: Function to open dialog programmatically
- `closeDialog()`: Function to close dialog
- `setOpen(open)`: Function to set open state directly

## Newsletter Functionality

The component includes a built-in newsletter signup form that:

1. **Validates email input** - Requires valid email format
2. **Shows loading state** - Animated spinner during submission
3. **Success feedback** - Animated checkmark and confirmation message
4. **Auto-reset** - Form clears after 3 seconds
5. **Clean messaging** - Simple, direct communication

### Customizing Newsletter Logic

To integrate with your actual newsletter service, modify the `handleNewsletterSubmit` function in the component:

```tsx
const handleNewsletterSubmit = async (e: React.FormEvent) => {
  e.preventDefault()
  if (!email) return

  setIsLoading(true)
  
  try {
    // Replace this with your actual API call
    await fetch('/api/newsletter', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        email, 
        feature: featureName,
        source: 'coming-soon-dialog' 
      })
    })
    
    setIsSubscribed(true)
  } catch (error) {
    console.error('Newsletter signup failed:', error)
    // Handle error state
  } finally {
    setIsLoading(false)
  }
}
```

## Examples in the Codebase

### Pricing Plans
```tsx
// In simple-pricing.tsx
<FeatureComingSoonDialog featureName={plan.name + " Plan"}>
  <Button>Start Now</Button>
</FeatureComingSoonDialog>
```

### Navigation
```tsx
// In navbar.tsx
<FeatureComingSoonDialog featureName="Account Registration">
  <Button>Get Started</Button>
</FeatureComingSoonDialog>
```

### Footer Links
```tsx
// In footer.tsx
<FeatureComingSoonDialog featureName="Analytics Dashboard">
  <span className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200 cursor-pointer">
    Analytics
  </span>
</FeatureComingSoonDialog>
```

## Design Philosophy

The dialog follows a **"less is more"** approach:

- **Single message**: "This feature isn't published yet"
- **Clear action**: Subscribe to newsletter for updates
- **No clutter**: Removed expected dates and lengthy descriptions
- **Fast interaction**: Quick, focused user experience

## Styling Notes

- Uses your existing color system (`primary`, `muted-foreground`, etc.)
- Follows your component patterns with proper spacing and typography
- Includes hover states and transitions consistent with other components
- Responsive design that works on mobile and desktop
- Compact size for better mobile experience

## Accessibility

- Proper ARIA labels and descriptions
- Keyboard navigation support
- Focus management
- Screen reader friendly
- Color contrast compliant
