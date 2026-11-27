'use client';

import { useMemo, useState } from 'react';
import { Activity, ChevronLeft, ChevronRight, Mail, Phone, Search } from 'lucide-react';

type Lead = {
  _id: string; name?: string; email?: string; phone?: string; company?: string;
  service?: string; budget?: string; message?: string; status?: string; createdAt?: string;
};

export default function LeadsView({ data }: { data: { items?: Lead[]; total?: number; page?: number; pages?: number } }) {
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(data.page || 1);
  const items = data.items || [];
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return items;
    return items.filter((lead) => [lead.name, lead.email, lead.phone, lead.company, lead.service, lead.budget, lead.message, lead.status].some((v) => String(v || '').toLowerCase().includes(q)));
  }, [items, query]);

  return <section className="panel leads-panel">
    <div className="panel-heading">
      <div><h3>Website enquiries</h3><p className="muted">All project requests submitted through the LazyXTech contact form</p></div>
      <Activity />
    </div>
    <div className="leads-toolbar">
      <div className="leads-count"><strong>{data.total ?? items.length}</strong><span>total enquiries</span></div>
      <label className="leads-search"><Search size={15}/><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search name, email, service…" aria-label="Search leads"/></label>
    </div>
    {filtered.length ? <div className="leads-table-wrap"><table className="leads-table">
      <thead><tr><th>Contact</th><th>Company</th><th>Service</th><th>Budget</th><th>Project details</th><th>Received</th><th>Status</th></tr></thead>
      <tbody>{filtered.map((lead) => <tr key={lead._id}>
        <td><strong>{lead.name || 'Website visitor'}</strong><a href={lead.email ? 'mailto:' + lead.email : undefined}><Mail size={12}/>{lead.email || 'No email'}</a>{lead.phone && <a href={'tel:' + lead.phone}><Phone size={12}/>{lead.phone}</a>}</td>
        <td>{lead.company || '—'}</td>
        <td>{lead.service || 'General enquiry'}</td>
        <td>{lead.budget || 'Not specified'}</td>
        <td className="lead-message" title={lead.message}>{lead.message || '—'}</td>
        <td>{lead.createdAt ? new Date(lead.createdAt).toLocaleString('en-IN', { dateStyle:'medium', timeStyle:'short', timeZone:'Asia/Kolkata' }) : '—'}</td>
        <td><span className={'status-pill ' + ((lead.status || 'new') === 'new' ? 'status-pending' : 'status-live')}>{lead.status || 'new'}</span></td>
      </tr>)}</tbody>
    </table></div> : <div className="table-empty">{query ? 'No enquiries match your search.' : 'No leads received yet. Website contact form submissions will appear here.'}</div>}
    <div className="leads-footer"><span>Showing {filtered.length} of {data.total ?? items.length} enquiries · Page {page} of {data.pages || 1}</span><div><button className="secondary" disabled={page <= 1} onClick={() => setPage((v) => Math.max(1, v - 1))}><ChevronLeft size={14}/> Previous</button><button className="secondary" disabled={page >= (data.pages || 1)} onClick={() => setPage((v) => Math.min(data.pages || 1, v + 1))}><ChevronRight size={14}/> Next</button></div></div>
  </section>;
}
