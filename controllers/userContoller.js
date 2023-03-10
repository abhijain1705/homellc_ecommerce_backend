const UserSchema = require("../models/userModule");
const crypto = require('crypto');
const emailValidator = require('email-validator');

module.exports.AddUser = async (req, res) => {

    const { email, phoneNumber, password } = req.body;

    // Validate email format using email-validator package
    if (!emailValidator.validate(email)) {
        return res.status(400).json({ error: 'Invalid email format' });
    }

    function validatePhoneNumber(phoneNumber) {
        const regex = /^\+(?:[0-9] ?){6,14}[0-9]$/; // This regex matches international phone numbers with or without spaces
        return regex.test(phoneNumber);
    }

    // Validate phone number format using phone package
    if (!validatePhoneNumber(phoneNumber)) {
        return res.status(400).json({ error: 'Invalid phone number format' });
    }

    // Validate password length
    if (password.length < 6) {
        return res.status(400).json({ error: 'Password must be at least 6 characters long' });
    }

    // Hash the password using a secure hashing algorithm such as SHA256
    const hashedPassword = crypto.createHash('sha256').update(req.body.password).digest('hex');
    const tempUser = { ...req.body };
    delete tempUser.password;
    const newUser = new UserSchema({ ...tempUser, password: hashedPassword });
    await newUser.save()
        .then(user => res.status(201).json(user))
        .catch(err => res.status(500).json({ error: err.message }));
}

module.exports.LoginUser = async (req, res) => {
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

        // Update the remember property of the user
        user.remember = req.body.remember;
        await user.save();

        // Return success response
        return res.status(201).json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
