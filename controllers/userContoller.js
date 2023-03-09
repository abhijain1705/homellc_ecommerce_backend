const UserSchema = require("../models/userModule");
const crypto = require('crypto');

module.exports.AddUser = async (req, res) => {
    // Hash the password using a secure hashing algorithm such as SHA256
    const hashedPassword = crypto.createHash('sha256').update(req.body.password).digest('hex');
    const tempUser = { ...req.body };
    delete tempUser.password;
    const newUser = new UserSchema({ ...tempUser, password: hashedPassword });
    await newUser.save()
        .then(user => res.status(201).json(user))
        .catch(err => res.status(500).json({ error: err.message }));
}

module.exports.GetCurrentUser = async (req, res) => {
    // Hash the password using the same algorithm and parameters as when it was originally hashed
    const hashedPassword = crypto.createHash('sha256').update(req.body.password).digest('hex');

    // Find the user with the provided email address
    try {
        const user = await UserSchema.findOne({ email: req.body.email });

        if (!user) {
            // User not found
            return res.status(401).json({ error: 'Incorrect email' });
        }

        // Check if the provided password matches the hashed password stored in the database
        if (user.password !== hashedPassword) {
            // Incorrect password
            return res.status(401).json({ error: 'Incorrect email or password' });
        }

        // Password is correct, return the user object
        return res.status(201).json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}