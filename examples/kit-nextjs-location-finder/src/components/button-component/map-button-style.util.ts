import type { VariantProps } from 'class-variance-authority';
import type { EnumValues } from '@/enumerations/generic.enum';
import { ButtonVariants } from '@/enumerations/ButtonStyle.enum';
import { cn } from '@/lib/utils';
import { buttonVariants } from '@/components/ui/button';

type UiButtonVariant = NonNullable<VariantProps<typeof buttonVariants>['variant']>;
type UiButtonColorScheme = NonNullable<
  VariantProps<typeof buttonVariants>['colorScheme']
>;

export type MappedButtonStyle = {
  variant: UiButtonVariant;
  colorScheme?: UiButtonColorScheme;
  className?: string;
};

/**
 * Maps legacy Sitecore `ButtonVariants` onto the UI Button's
 * `variant` + `colorScheme` model (with optional legacy classNames).
 */
export function mapButtonStyle(
  variant?: EnumValues<typeof ButtonVariants>,
  className?: string
): MappedButtonStyle {
  switch (variant) {
    case ButtonVariants.DESTRUCTIVE:
      return {
        variant: 'default',
        colorScheme: 'danger',
        className,
      };
    case ButtonVariants.SECONDARY:
      return {
        variant: 'default',
        colorScheme: 'neutral',
        className,
      };
    case ButtonVariants.TERTIARY:
      return {
        variant: 'ghost',
        colorScheme: 'neutral',
        className,
      };
    case ButtonVariants.OUTLINE:
      return {
        variant: 'outline',
        className,
      };
    case ButtonVariants.GHOST:
      return {
        variant: 'ghost',
        className,
      };
    case ButtonVariants.LINK:
      return {
        variant: 'link',
        className,
      };
    case ButtonVariants.TOPIC:
      return {
        variant: 'default',
        colorScheme: 'neutral',
        className: cn(
          'rounded-full bg-accent px-4 py-2 font-heading text-sm font-medium text-accent-foreground transition-colors hover:bg-primary-hover',
          className
        ),
      };
    case ButtonVariants.ROUNDED_WHITE:
      return {
        variant: 'default',
        colorScheme: 'neutral',
        className: cn(
          'rounded-full bg-white text-secondary-foreground transition-all duration-300 hover:bg-gray-100',
          className
        ),
      };
    case ButtonVariants.PRIMARY:
    case ButtonVariants.DEFAULT:
    default:
      return {
        variant: 'default',
        colorScheme: 'primary',
        className,
      };
  }
}
