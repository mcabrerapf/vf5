const generateId = () => `id-${Date.now()}-${Math.random().toString(30)}`;

export default generateId;