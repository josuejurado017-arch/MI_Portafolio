import axios from 'axios';
import { profile } from '../utils/content';

const github = axios.create({ baseURL: 'https://api.github.com', timeout: 12000, headers: { Accept: 'application/vnd.github+json' } });

export async function fetchGithub(username, signal) {
  const user = encodeURIComponent(username);
  const [account, repos, events] = await Promise.all([
    github.get(`/users/${user}`, { signal }),
    github.get(`/users/${user}/repos`, { params: { sort: 'updated', per_page: 6, type: 'owner' }, signal }),
    github.get(`/users/${user}/events/public`, { params: { per_page: 30 }, signal }),
  ]);
  return { account: account.data, repos: repos.data, events: events.data };
}

export async function sendContact(values) {
  if (!profile.contactEndpoint) throw new Error('UNCONFIGURED');
  // The endpoint must provide server-side validation, spam protection and delivery.
  await axios.post(profile.contactEndpoint, { name: values.name.trim(), email: values.email.trim(), subject: values.subject.trim(), message: values.message.trim(), _gotcha: values.website }, { timeout: 15000, headers: { Accept: 'application/json' } });
}
