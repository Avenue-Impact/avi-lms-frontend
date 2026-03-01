import CoursesCountdownTimer from ".";

export default function CoursesCountdown() {
    return (
        <div className="bg-black py-8">
            <div className="mx-auto px-4">
            <div className="max-w-4xl bg-red-700 mx-auto text-center">
                <h3 className="text-xl font-semibold mb-6">Program Starts In:</h3>
                <CoursesCountdownTimer targetDate={programStartDate} />
            </div>
            </div>
        </div>
    )
}