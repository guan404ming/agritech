const handleFormatDate = (date: Date) => (
    [
        date.getFullYear() - 1911,
        (date.getMonth() + 1).toString().padStart(2, '0'),
        (date.getDate()).toString().padStart(2, '0'),
    ].join('.')
);

export default handleFormatDate;
