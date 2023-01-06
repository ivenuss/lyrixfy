import React, { useCallback, useState } from 'react';
import { FaqBox } from '~/components/FaqBox';

const questions = [
  {
    title: 'Can I remove the logo from the card?',
    description:
      "We don't currently offer this option, but we're planing in a future to let you replace the logo with your own."
  },
  {
    title: "What can I do when song doesn't have the lyrics",
    description:
      "We're sorry to hear that, but that song is not currently listed in our databse or doesn't have lyrics support."
  },
  {
    title: 'Will there be more themes to choose from?',
    description: 'Yes. We want to add more customization'
  }
];

export const Faq = () => {
  const [openBox, setOpenBox] = useState<number | null>(null);

  const handleToggle = useCallback(
    (id: number) => {
      if (openBox === id) setOpenBox(null);
      else setOpenBox(id);
    },
    [openBox]
  );

  return (
    <section className="flex flex-col">
      <h3 className="mb-4 text-xl font-bold text-black dark:text-primary-100">
        Frequently asked questions
      </h3>

      <div className="flex flex-col space-y-3">
        {questions.map((question, i) => (
          <FaqBox
            key={question.title}
            isOpen={openBox === i}
            onToggle={() => handleToggle(i)}
            title={question.title}
            description={question.description}
          />
        ))}
      </div>
    </section>
  );
};
