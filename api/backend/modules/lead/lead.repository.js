import { db } from '../../config/db.js';

const mapLead = (row) => {
  if (!row) return null;
  return {
    id: row._id,
    _id: row._id,
    name: row.name,
    email: row.email,
    phone: row.phone,
    service: row.service,
    message: row.message,
    status: row.status,
    quality: row.quality,
    notes: row.notes,
    createdAt: row.created_at,
    updatedAt: row.updated_at
  };
};

let localLeads = [
  {
    id: 'lead_mock_1',
    _id: 'lead_mock_1',
    name: 'Sahil Kumar',
    email: 'sahil@kvantumtechsolutions.com',
    phone: '+919999888877',
    service: 'Web Development',
    message: 'Hey, I want to redesign our core client portal layout. Let us schedule a talk soon.',
    status: 'New',
    quality: 'Warm',
    notes: 'Awaiting callback schedule.',
    createdAt: new Date(),
    updatedAt: new Date()
  }
];

export const createLead = async (leadData) => {
  const { name, email, phone } = leadData;
  const service = leadData.service || 'General Technical Consultation';
  const message = leadData.message || leadData.notes || leadData.requirements || 'Inquiry details';
  const id = 'lead_' + Math.random().toString(36).substr(2, 9);
  
  const mapped = {
    id,
    _id: id,
    name,
    email,
    phone: phone || '',
    service,
    message,
    status: 'New',
    quality: 'Warm',
    notes: leadData.notes || message || '',
    createdAt: new Date(),
    updatedAt: new Date()
  };

  try {
    const result = await db.query(
      `INSERT INTO leads ("_id", "name", "email", "phone", "service", "message") VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
      [id, name, email, phone || '', service, message]
    );
    const lead = mapLead(result.rows[0]) || mapped;
    localLeads.unshift(lead);
    return lead;
  } catch (err) {
    console.warn('[DB LEAD SAVE] DB save fallback:', err.message);
    localLeads.unshift(mapped);
    return mapped;
  }
};

export const getAllLeads = async () => {
  try {
    const result = await db.query('SELECT * FROM leads ORDER BY "created_at" DESC');
    const dbLeads = (result.rows || []).map(mapLead);
    const combinedMap = new Map();
    [...localLeads, ...dbLeads].forEach(item => {
      if (item && item.id) {
        combinedMap.set(item.id, item);
      }
    });
    return Array.from(combinedMap.values());
  } catch (err) {
    return localLeads;
  }
};

export const updateLeadById = async (id, updateData) => {
  const { status, quality, notes } = updateData;
  
  try {
    const result = await db.query(
      `UPDATE leads 
       SET "status" = COALESCE($1, "status"), 
           "quality" = COALESCE($2, "quality"), 
           "notes" = COALESCE($3, "notes"),
           "updated_at" = CURRENT_TIMESTAMP
       WHERE "_id" = $4 
       RETURNING *`,
      [status, quality, notes, id]
    );
    const lead = mapLead(result.rows[0]);
    if (lead) {
      localLeads = localLeads.map(l => l._id === id ? lead : l);
      return lead;
    }
  } catch (err) {
    console.warn('[OFFLINE FALLBACK] Lead update failed. Updating in local memory:', err.message);
  }

  // Local fallback update
  localLeads = localLeads.map(l => {
    if (l._id === id) {
      return {
        ...l,
        status: status !== undefined ? status : l.status,
        quality: quality !== undefined ? quality : l.quality,
        notes: notes !== undefined ? notes : l.notes,
        updatedAt: new Date()
      };
    }
    return l;
  });
  return localLeads.find(l => l._id === id);
};
