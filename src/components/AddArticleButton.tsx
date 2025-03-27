import { Plus } from "lucide-react";

interface AddArticleButtonProps {
  onClick: () => void;
}

const AddArticleButton = ({ onClick }: AddArticleButtonProps) => {
  return (
    <button
      onClick={onClick}
      className="fixed bottom-8 right-8 z-40 bg-primary text-primary-foreground rounded-full p-4 shadow-lg btn-hover"
      aria-label="Add new article"
    >
      <Plus className="h-6 w-6" />
    </button>
  );
};

export default AddArticleButton;
