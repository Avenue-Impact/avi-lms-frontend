import { CommonButton } from "@/Components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/Components/ui/dialog";

const EditModal = ({ children, form, header = "Edit on-demand section" }) => {
  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <CommonButton variant="ghost" className="w-full padding-0 text-left pl-1">
            {children}
          </CommonButton>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[665px]">
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
