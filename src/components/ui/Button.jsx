import { Link } from 'react-router-dom';

const variants = {
  primary: 'border-black bg-black text-white hover:bg-white hover:text-black active:border-[5px] dark:border-white dark:bg-white dark:text-black dark:hover:bg-black dark:hover:text-white',
  secondary: 'border-black bg-white text-black hover:bg-black hover:text-white dark:border-white dark:bg-black dark:text-white dark:hover:bg-white dark:hover:text-black',
  ghost: 'border-transparent bg-transparent px-0 text-black underline hover:text-raw-blue dark:text-white dark:hover:text-raw-blue',
  destructive: 'border-black bg-raw-red text-white hover:bg-black hover:text-raw-red dark:border-white'
};

const sizes = {
  sm: 'min-h-8 px-4 py-1.5 text-xs',
  md: 'min-h-11 px-6 py-2.5 text-sm',
  lg: 'min-h-14 px-10 py-4 text-lg'
};

export function Button({ as: Component = 'button', to, href, variant = 'primary', size = 'md', className = '', children, ...props }) {
  const classes = `inline-flex items-center justify-center border-[3px] font-headline uppercase tracking-[2px] transition-colors disabled:cursor-not-allowed disabled:border-raw-muted disabled:bg-raw-soft disabled:text-raw-muted ${variants[variant]} ${sizes[size]} ${className}`;

  if (to) return <Link to={to} className={classes} {...props}>{children}</Link>;
  if (href) return <a href={href} className={classes} {...props}>{children}</a>;
  return <Component className={classes} {...props}>{children}</Component>;
}
