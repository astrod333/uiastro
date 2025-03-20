'use client';

import { type HTMLAttributes, useCallback, useEffect, useState } from 'react';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { buttonVariants } from '@/components/ui/button';

interface BannerProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * @defaultValue 'rainbow'
   */
  variant?: 'rainbow' | 'normal';
  /**
   * @defaultValue true
   */
  changeLayout?: boolean;
  /**
   * Banner message
   */
  message?: string;
  /**
   * @defaultValue '3rem'
   */
  height?: string;
}

export function Banner({
  id,
  variant = 'normal',
  changeLayout = true,
  message,
  height = '3rem',
  ...props
}: BannerProps): React.ReactElement {
  const [open, setOpen] = useState(true);
  const globalKey = id ? `banner-${id}` : undefined;

  useEffect(() => {
    if (globalKey) setOpen(localStorage.getItem(globalKey) !== 'true');
  }, [globalKey]);

  const onClick = useCallback(() => {
    setOpen(false);
    if (globalKey) localStorage.setItem(globalKey, 'true');
  }, [globalKey]);

  return (
    <div
      id={id}
      {...props}
      style={{ height: open ? height : '0' }}
      className={cn(
        'sticky top-0 z-40 flex flex-row items-center justify-center bg-secondary px-4 text-center text-sm font-medium transition-all duration-300',
        variant === 'rainbow' && 'bg-background',
        !open && 'hidden',
        props.className,
      )}
    >
      {changeLayout && open ? (
        <style>{`
        :root:not(.${globalKey ?? 'banner-never'}) { --banner-height: ${height}; }
        `}</style>
      ) : null}
      {globalKey ? (
        <style>{`.${globalKey} #${id} { display: none; }`}</style>
      ) : null}
      {id ? (
        <script
          dangerouslySetInnerHTML={{
            __html: `if (localStorage.getItem('${globalKey}') === 'true') document.documentElement.classList.add('${globalKey}');`,
          }}
        />
      ) : null}

      {variant === 'rainbow' ? <RainbowLayer /> : null}
      {message || props.children}
      {id ? (
        <button
          type="button"
          aria-label="Close Banner"
          onClick={onClick}
          className={cn(
            buttonVariants({
              variant: 'ghost',
              className: 'absolute end-2 top-1/2 -translate-y-1/2 text-muted-foreground',
              size: 'icon',
            }),
          )}
        >
          <X className="h-4 w-4" />
        </button>
      ) : null}
    </div>
  );
}

const RainbowLayer = () => {
  return (
    <>
      <div className="absolute inset-0 z-[-1] rainbow-banner-gradient-1" />
      <div className="absolute inset-0 z-[-1] rainbow-banner-gradient-2" />
      <style jsx>{`
        .rainbow-banner-gradient-1 {
          background: linear-gradient(
            to right,
            #6366f1,
            #8b5cf6,
            #d946ef,
            #ec4899,
            #f43f5e,
            #f97316
          );
          opacity: 0.7;
        }
        .rainbow-banner-gradient-2 {
          background: linear-gradient(
            to right,
            rgba(99, 102, 241, 0.2),
            rgba(139, 92, 246, 0.2),
            rgba(217, 70, 239, 0.2),
            rgba(236, 72, 153, 0.2),
            rgba(244, 63, 94, 0.2),
            rgba(249, 115, 22, 0.2)
          );
          animation: rainbow-animation 3s linear infinite;
        }
        @keyframes rainbow-animation {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
      `}</style>
    </>
  );
};