import { useEffect, useState } from 'react';
import { adminApi } from '../../api/portfolio';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { SectionHeader } from '../../components/ui/SectionHeader';

export function Messages() {
  const [messages, setMessages] = useState([]);

  const load = () => adminApi.list('messages').then(setMessages).catch(() => setMessages([]));

  useEffect(() => {
    load();
  }, []);

  return (
    <main>
      <SectionHeader title="Messages" eyebrow="Contact Inbox" />
      <div className="grid gap-3">
        {messages.map((message) => (
          <Card key={message._id}>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="text-2xl">{message.name}</h3>
                  <Badge tone={message.read ? 'default' : 'warning'}>{message.read ? 'Read' : 'New'}</Badge>
                </div>
                <a href={`mailto:${message.email}`}>{message.email}</a>
              </div>
              <Button variant="destructive" size="sm" onClick={async () => { await adminApi.remove('messages', message._id); load(); }}>Delete</Button>
            </div>
            <p className="mt-3 border-t-[3px] border-black pt-3 dark:border-white">{message.message}</p>
          </Card>
        ))}
        {messages.length === 0 && <Card>No contact messages yet.</Card>}
      </div>
    </main>
  );
}
