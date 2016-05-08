import moment from 'moment';

export function serverToTimestamp(server) {
  const iphone = +new Date('01/01/2001 00:00:00 UTC');
  const timestamp = iphone + server * 1000;
  return new Date(timestamp);
}

export function serverAgo(server) {
  return moment(serverToTimestamp(server)).fromNow();
}

export function timestampToServer() {
  const iphone = +new Date('01/01/2001 00:00:00 UTC');
  const t = Date.now() - (+iphone);
  return t / 1000;
}
