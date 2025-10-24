import React, { useState, useMemo } from 'react'
import '../../components/govDashboard.css'

const dummy = Array.from({ length: 42 }).map((_, i) => ({
  id: i + 1,
  name: ['Paul Chilwalo', 'Grace Mwansa', 'John Phiri', 'Mary Zulu'][i % 4] + ` ${i + 1}`,
  nrc: `${2000 + i}/${(i % 99).toString().padStart(2, '0')}/${(i % 9) + 1}`,
  taxId: `ZA-${10000 + i}`,
  dateRegistered: `2025-10-${((i % 28) + 1).toString().padStart(2, '0')}`,
  status: i % 3 === 0 ? 'Active' : i % 3 === 1 ? 'Inactive' : 'Pending'
}));

export default function Citizens() {
  const [q, setQ] = useState('');
  const [filter, setFilter] = useState('all');
  const [page, setPage] = useState(1);
  const [sortKey, setSortKey] = useState('name');
  const pageSize = 8;

  const filtered = useMemo(() => {
    let arr = dummy.filter(d =>
      (d.name + ' ' + d.nrc + ' ' + d.taxId).toLowerCase().includes(q.toLowerCase())
    );
    if (filter !== 'all') arr = arr.filter(a => a.status.toLowerCase() === filter);
    arr.sort((a, b) => (a[sortKey] > b[sortKey] ? 1 : -1));
    return arr;
  }, [q, filter, sortKey]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const pageData = filtered.slice((page - 1) * pageSize, page * pageSize);

  return (
    <div className="gov-panel">
      <div className="gov-panel-header">
        <h2>Registered Citizens</h2>
        <div className="gov-panel-controls">
          <div className="gov-search-box">
            <input placeholder="Search by name, NRC or Tax ID..."
              value={q}
              onChange={e => { setQ(e.target.value); setPage(1); }} />
          </div>
          <select value={filter} onChange={e => { setFilter(e.target.value); setPage(1); }}>
            <option value="all">All</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="pending">Pending</option>
          </select>
          <select value={sortKey} onChange={e => setSortKey(e.target.value)}>
            <option value="name">Name A-Z</option>
            <option value="dateRegistered">Date Registered</option>
            <option value="status">Status</option>
          </select>
        </div>
      </div>

      <div className="gov-table-container" style={{ overflowX: 'auto' }}>
        <table className="gov-table" style={{ minWidth: 800 }}>
          <thead>
            <tr>
              <th>Name</th>
              <th>NRC</th>
              <th>Tax ID</th>
              <th>Date Registered</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {pageData.map(c => (
              <tr key={c.id} className="fadeIn">
                <td>{c.name}</td>
                <td>{c.nrc}</td>
                <td>{c.taxId}</td>
                <td>{c.dateRegistered}</td>
                <td>
                  <span className={`gov-status-badge ${c.status === 'Active'
                    ? 'success'
                    : c.status === 'Inactive'
                      ? 'warning'
                      : 'danger'}`}>{c.status}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="gov-table-footer" style={{ marginTop: 12 }}>
        <div className="gov-table-info">
          Showing {((page - 1) * pageSize) + 1}-{Math.min(page * pageSize, filtered.length)} of {filtered.length} citizens
        </div>
        <div className="gov-pagination">
          <button className="gov-page-btn" disabled={page === 1} onClick={() => setPage(p => Math.max(1, p - 1))}>‹</button>
          <span className="gov-page-number">Page {page} / {totalPages}</span>
          <button className="gov-page-btn" disabled={page === totalPages} onClick={() => setPage(p => Math.min(totalPages, p + 1))}>›</button>
        </div>
      </div>
    </div>
  );
}
