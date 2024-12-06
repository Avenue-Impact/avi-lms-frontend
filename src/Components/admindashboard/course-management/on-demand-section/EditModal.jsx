import { CommonButton } from "@/Components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/Components/ui/dialog";

const EditModal = ({
  children,
  form,
  header = "Edit on-demand section",
  open,
  setOpen,
}) => {
  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen} className="py-10">
        <DialogTrigger asChild>
          <CommonButton
            variant="ghost"
            className="padding-0 w-full pl-1 text-left hover:bg-transparent"
          >
            {children}
          </CommonButton>
        </DialogTrigger>
        <DialogContent className="w-max">
          <DialogHeader>
            <DialogTitle>{header}</DialogTitle>
            <DialogDescription></DialogDescription>
          </DialogHeader>
          <div className="baby max-h-[90vh] overflow-y-scroll">{form}</div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default EditModal;
