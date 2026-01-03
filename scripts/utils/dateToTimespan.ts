
function dateToTimespan(createdAt: number, small?: boolean): string {
    const now = Date.now();
    const diff = now - createdAt;

    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) return `${days}${small ? 'd' : ' day' + (days > 1 ? 's' : '')} ago`;
    if (hours > 0) return `${hours}${small ? 'h' : ' hour' + (hours > 1 ? 's' : '')} ago`;
    if (minutes > 0) return `${minutes}${small ? 'm' : ' minute' + (minutes > 1 ? 's' : '')} ago`;
    return `${seconds}${small ? 's' : ' second' + (seconds > 1 ? 's' : '')} ago`;
}


export { dateToTimespan };