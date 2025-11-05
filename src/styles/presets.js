// Style preset definitions - controls spacing, roundedness, and shadow intensity

export const PRESETS = {
  classic: {
    spacing: 'normal',
    roundedness: 'md',
    shadows: 'md',
    description: 'Balanced, professional look'
  },
  airy: {
    spacing: 'loose',
    roundedness: 'lg',
    shadows: 'sm',
    description: 'More space, softer corners, subtle shadows'
  },
  bold: {
    spacing: 'tight',
    roundedness: 'sm',
    shadows: 'xl',
    description: 'Compact, sharp corners, strong shadows'
  },
  minimal: {
    spacing: 'normal',
    roundedness: 'none',
    shadows: 'none',
    description: 'Clean and simple'
  }
};

// CSS variable mappings for each preset property
export const presetStyles = {
  spacing: {
    normal: { '--spacing-sm': '0.5rem', '--spacing-md': '1rem', '--spacing-lg': '2rem' },
    loose: { '--spacing-sm': '1rem', '--spacing-md': '2rem', '--spacing-lg': '4rem' },
    tight: { '--spacing-sm': '0.25rem', '--spacing-md': '0.5rem', '--spacing-lg': '1rem' }
  },
  roundedness: {
    none: { '--border-radius': '0' },
    sm: { '--border-radius': '0.375rem' },
    md: { '--border-radius': '0.75rem' },
    lg: { '--border-radius': '1.5rem' }
  },
  shadows: {
    none: { '--shadow-sm': '0 0 0 rgba(0,0,0,0)', '--shadow-md': '0 0 0 rgba(0,0,0,0)', '--shadow-lg': '0 0 0 rgba(0,0,0,0)' },
    sm: { '--shadow-sm': '0 1px 2px rgba(0,0,0,0.05)', '--shadow-md': '0 2px 4px rgba(0,0,0,0.1)', '--shadow-lg': '0 4px 6px rgba(0,0,0,0.15)' },
    md: { '--shadow-sm': '0 2px 4px rgba(0,0,0,0.1)', '--shadow-md': '0 4px 6px rgba(0,0,0,0.2)', '--shadow-lg': '0 10px 15px rgba(0,0,0,0.25)' },
    xl: { '--shadow-sm': '0 4px 6px rgba(0,0,0,0.2)', '--shadow-md': '0 10px 15px rgba(0,0,0,0.3)', '--shadow-lg': '0 20px 25px rgba(0,0,0,0.4)' }
  }
};

