import { motion } from 'framer-motion';
import { useTheme } from '@/hooks/useTheme';
import { useTranslation } from 'react-i18next';

const colorMap = {
  cyan: 'bg-cyan-400',
  orange: 'bg-orange-400',
  green: 'bg-emerald-400',
  pink: 'bg-pink-400',
  yellow: 'bg-yellow-400',
  purple: 'bg-purple-400',
};

export const ColorPicker = () => {
  const { accentColor, setAccentColor, accentColors } = useTheme();
  const { t } = useTranslation();

  return (
    <div className="flex items-center gap-2">
      <span className="text-xs text-muted-foreground hidden sm:inline">
        {t('theme.pickColor')}
      </span>
      <div className="flex gap-1.5">
        {accentColors.map((color) => (
          <motion.button
            key={color}
            onClick={() => setAccentColor(color)}
            className={`w-5 h-5 rounded-full ${colorMap[color]} transition-transform`}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            animate={{
              scale: accentColor === color ? 1.2 : 1,
              boxShadow: accentColor === color 
                ? '0 0 12px currentColor' 
                : 'none',
            }}
            aria-label={`Set ${color} accent color`}
          />
        ))}
      </div>
    </div>
  );
};
