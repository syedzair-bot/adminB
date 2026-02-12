const supabase = require('../config/supabase');

const addUniversity = async (req, res) => {
    try {
        const { name, url } = req.body;
        const files = req.files;
        const uploadedDocs = [];

        // Upload files to Supabase Storage
        if (files && files.length > 0) {
            for (const file of files) {
                // Sanitize filename to avoid issues
                const fileName = `${Date.now()}_${file.originalname.replace(/\s+/g, '_')}`;

                const { data, error } = await supabase
                    .storage
                    .from('university-docs')
                    .upload(fileName, file.buffer, {
                        contentType: file.mimetype
                    });

                if (error) {
                    console.error('Error uploading file:', error);
                    continue; // Skip file if upload fails, or handle error as needed
                }

                // Get public URL
                const { data: publicUrlData } = supabase
                    .storage
                    .from('university-docs')
                    .getPublicUrl(fileName);

                if (publicUrlData) {
                    uploadedDocs.push(publicUrlData.publicUrl);
                }
            }
        }

        // Insert into Database
        const { data, error } = await supabase
            .from('universities')
            .insert([
                {
                    name,
                    url,
                    docs: uploadedDocs,
                    status: 'IN PROGRESS',
                    progress: 0,
                    location: 'Remote' // Default location for now
                }
            ])
            .select();

        if (error) {
            throw new Error(error.message);
        }

        res.status(201).json({ message: 'University added successfully', data });

    } catch (error) {
        console.error('Error adding university:', error);
        res.status(500).json({ error: error.message });
    }
};

const getUniversities = async (req, res) => {
    try {
        const { data, error } = await supabase
            .from('universities')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) {
            throw new Error(error.message);
        }

        res.status(200).json(data);

    } catch (error) {
        console.error('Error fetching universities:', error);
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    addUniversity,
    getUniversities
};
