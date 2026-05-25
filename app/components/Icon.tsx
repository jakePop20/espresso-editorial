import type {MaterialSymbol} from 'material-symbols';

type IconProps = {
  name: MaterialSymbol;
  className?: string;
  /** Filled variant (e.g. active nav, starred). */
  filled?: boolean;
};

/**
 * Material Symbols Outlined — icons from the `material-symbols` package.
 * @see https://fonts.google.com/icons
 */
export function Icon({name, className = '', filled = false}: IconProps) {
  return (
    <span
      className={`material-symbols-outlined ${className}`.trim()}
      aria-hidden
      data-icon={name}
      style={
        filled
          ? {
              fontVariationSettings:
                "'FILL' 1, 'wght' 300, 'GRAD' 0, 'opsz' 24",
            }
          : undefined
      }
    >
      {name}
    </span>
  );
}
