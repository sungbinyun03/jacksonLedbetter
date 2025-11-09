import { useMemo } from 'react';
import { PRESETS, presetStyles } from './presets';

/**
 * StyleProvider component that applies CSS variables based on selected preset and colors
 * Wraps the entire app to provide dynamic styling
 */
export default function StyleProvider({ children, stylePreset, colors }) {
  const preset = PRESETS[stylePreset] || PRESETS.classic;

  const cssVars = useMemo(() => {
    const vars = {
      '--color-primary': colors?.primary || '#000000',
      '--color-background': colors?.background || '#ffffff',
      '--color-accent': colors?.accent || '#666666',
      ...presetStyles.spacing[preset.spacing],
      ...presetStyles.roundedness[preset.roundedness],
      ...presetStyles.shadows[preset.shadows]
    };
    
    return vars;
  }, [stylePreset, colors, preset]);

  return (
		<div
			className="theme-root"
			style={{
				...cssVars,
				backgroundColor: 'var(--color-background)',
				color: 'var(--color-primary)'
			}}
		>
      {children}
    </div>
  );
}

