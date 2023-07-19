const handleFormatDate = (date: Date) => (
    [
        date.getFullYear() - 1911,
        (date.getMonth() + 1).toString().padStart(2, '0'),
        (date.getDate()).toString().padStart(2, '0'),
    ].join('.')
);

const curDate = new Date();

const prevDate = new Date();
prevDate.setDate(curDate.getDate() - 1);

export { handleFormatDate, curDate, prevDate };
