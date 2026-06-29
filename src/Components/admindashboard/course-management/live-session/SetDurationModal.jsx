import React, { useState } from "react";
import Modal from "@/pages/auth/components/Modal";
import CommonButton from "@/Components/ui/button";

const SetDurationModal = ({ open, setOpen, onSetDuration, isPending }) => {
  const [months, setMonths] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (months && !isNaN(months)) {
      onSetDuration(Number(months));
    }
  };

  if (!open) return null;

  return (
    <Modal>
      <div className="w-[400px] p-6 bg-white rounded-lg">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Set Duration Access</h3>
        <p className="text-sm text-gray-500 mb-6">
          Set the number of months the student has access to this cohort and its recorded sessions.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="months" className="block text-sm font-medium text-gray-700 mb-1">
              Duration (Months)
            </label>
            <input
              type="number"
              id="months"
              value={months}
              onChange={(e) => setMonths(e.target.value)}
              min="1"
              required
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-primary-color-600 focus:outline-none focus:ring-1 focus:ring-primary-color-600"
              placeholder="e.g. 6"
            />
          </div>

          <div className="flex justify-end gap-3">
            <CommonButton
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              className="px-4 py-2"
            >
              Cancel
            </CommonButton>
            <CommonButton
              type="submit"
              disabled={isPending || !months}
              className="bg-primary-color-600 px-4 py-2 text-white"
            >
              {isPending ? "Saving..." : "Save Duration"}
            </CommonButton>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default SetDurationModal;
