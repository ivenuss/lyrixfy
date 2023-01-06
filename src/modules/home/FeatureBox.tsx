import type { Icon } from 'react-feather';

interface FeatureBoxProps {
  icon: Icon;
  title: string;
  description: string;
}

export const FeatureBox: React.FC<FeatureBoxProps> = ({
  icon: Icon,
  title,
  description
}) => (
  <div className="flex flex-row items-start gap-4 md:flex-col">
    <div className="rounded-xl bg-accent p-2.5 text-black md:mb-2">
      <Icon className="h-4 w-4" />
    </div>
    <div>
      <h4 className="mb-1 text-lg font-medium text-black dark:text-primary-100">
        {title}
      </h4>
      <div className="text-gray-600 dark:text-primary-300">{description}</div>
    </div>
  </div>
);
