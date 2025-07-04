import { useState, useEffect } from "react";
import Confetti from "react-confetti"

export default function CountdownButton() {
    const [buttonLabel, setButtonLabel] = useState("");
    const [isBirthday, setIsBirthday] = useState(false);

    useEffect(() => {
        function updateCountdown() {
            const now = new Date();

            //  Goal is to set birthday: 9th Aug, 00:00 IST
            const ist_Offset = 5.5 * 60; // IST in minutes
            const todayIST = new Date(now.getTime() + (ist_Offset - now.getTimezoneOffset()) * 60000); // 60000 is converting minutes into milliseconds

            // Set birthday time for this year
            let birthday = new Date(Date.UTC(todayIST.getFullYear(), 7, 8, 18, 30, 0)); // Months are 0-indexed (7 = August) and 8th Aug 18:30 UTC == 9th Aug 00:00 IST

            // If birthday is over, move to the next year
            if(todayIST > birthday) {
                birthday = new Date(Date.UTC(todayIST.getFullYear() + 1, 7, 8, 18, 30, 0));
            }

            const totalSeconds = Math.floor((birthday - todayIST) / 1000);  // We get time in Milliseconds. 1 Second = 1000 ms.
            const diffDays = Math.floor(totalSeconds / (60 * 60 * 24));
            const diffHours = Math.floor((totalSeconds % (60 * 60 * 24)) / (60 * 60));
            const diffMinutes = Math.floor((totalSeconds % (60 * 60)) / 60);
            const diffSeconds = totalSeconds % 60;
            
            // Get IST date parts
            const istDate = todayIST.getDate();
            const istMonth = todayIST.getMonth();

            // If it's a birthday today
            if(istDate === 9 && istMonth === 7) {
                setIsBirthday(true);
                setButtonLabel("🎁 Send A Wish");
            } else {
                setIsBirthday(false);
                setButtonLabel(`🎉 ${diffDays}d ${diffHours}h ${diffMinutes}m ${diffSeconds}s To Go!`);
                //setButtonLabel(`🎉 ${diffDays} day${diffDays > 1 ? "s" : ""} To Go!`);
            }
        }

        updateCountdown(); // Run once immediately
        const interval = setInterval(() => {
            updateCountdown()
        }, 1000); // Updates every second

        return () => clearInterval(interval); // Clean up
    }, [])

    return (
        <>
            {isBirthday && <Confetti />}
            <button className="wish-button">{buttonLabel}</button>
        </>
    );
}