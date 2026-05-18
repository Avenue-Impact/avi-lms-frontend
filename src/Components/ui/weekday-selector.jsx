import { Controller } from "react-hook-form";

const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export default function WeekdaysSelector({ control, name }) {
  return (
    <Controller
      control={control}
      name={name}
      defaultValue={"Mon,Tue,Wed,Thu,Fri"}
      render={({ field: { value, onChange } }) => {
        const parseValue = (val) => {
          if (!val) return [];
          const parts = val.split(",");
          let days = [];
          parts.forEach((part) => {
            part = part.trim();
            if (part.includes("-")) {
              const [start, end] = part.split("-").map((s) => s.trim());
              const startIndex = weekdays.findIndex(
                (d) => d.toLowerCase() === start.toLowerCase()
              );
              const endIndex = weekdays.findIndex(
                (d) => d.toLowerCase() === end.toLowerCase()
              );
              if (startIndex !== -1 && endIndex !== -1) {
                if (startIndex <= endIndex) {
                  for (let i = startIndex; i <= endIndex; i++) {
                    if (!days.includes(weekdays[i])) days.push(weekdays[i]);
                  }
                } else {
                  for (let i = startIndex; i < weekdays.length; i++) {
                    if (!days.includes(weekdays[i])) days.push(weekdays[i]);
                  }
                  for (let i = 0; i <= endIndex; i++) {
                    if (!days.includes(weekdays[i])) days.push(weekdays[i]);
                  }
                }
              } else {
                if (!days.includes(part)) days.push(part);
              }
            } else {
              const matchingDay = weekdays.find(
                (d) => d.toLowerCase() === part.toLowerCase()
              );
              if (matchingDay) {
                if (!days.includes(matchingDay)) days.push(matchingDay);
              } else {
                if (!days.includes(part)) days.push(part);
              }
            }
          });
          return days;
        };

        const selectedDays = parseValue(value);

        const toggleDay = (day) => {
          const newDays = selectedDays.includes(day)
            ? selectedDays.filter((d) => d !== day)
            : [...selectedDays, day];
          onChange(newDays.join(","));
        };

        return (
          <div>
            <label className="mb-2 block text-base font-medium">
              Class Days
            </label>
            <div className="flex gap-2">
              {weekdays.map((day) => (
                <button
                  key={day}
                  type="button"
                  onClick={() => toggleDay(day)}
                  className={`flex h-10 w-10 items-center justify-center rounded-full border font-medium ${
                    selectedDays.includes(day)
                      ? "border-primary-color-800 bg-primary-color-600 text-white"
                      : "border-gray-300 bg-white text-gray-700"
                  } `}
                >
                  {day.slice(0, 3)}
                </button>
              ))}
            </div>
            <p className="mt-1 text-sm text-gray-500">{`Selected: ${selectedDays.join(", ")}`}</p>
          </div>
        );
      }}
    />
  );
}
