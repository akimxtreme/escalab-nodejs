// Generic Imports
const express           = require("express");
const mongoose          = require("mongoose");
const morgan            = require("morgan");
const bodyParser        = require("body-parser");
const cookieParser      = require("cookie-parser");
const cors              = require("cors");
const expressValidator  = require("express-validator");
/* Only for .env */       require("dotenv").config();
const swaggerJsDoc      = require("swagger-jsdoc");
const swaggerUi         = require("swagger-ui-express");

// Route Project
const authRoutes            = require("./routes/auth");
const userRoutes            = require("./routes/user");
const kingdomRoutes         = require("./routes/kingdom");
const groupRoutes           = require("./routes/group");
const classificationRoutes  = require("./routes/classification");
const livingBeingRoutes     = require("./routes/livingBeing");

// app - express
const app = express();

// modern connection
const db = async () => {
    try {
        const success = await mongoose.connect(process.env.DATABASE, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true, 
            useFindAndModify: false
        });
        console.log('DB connected successfully');
    } catch (error) {
        console.log('DB Connection Error', error);
    }
}

// execute db connection
db();

// middlewares
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(expressValidator());
app.use(cors());

// Extended: https://swagger.io/specification/#infoObject
const swaggerOptions = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            version: "1.0.0",
            title: "Living Beings API",
            description: "Living things of the world API Information",
            contact: {
                name: "domingo_dev"
            },
            servers: ["http://localhost:8001"]
        }
    },
    // definition the apis with swagger 
    apis: ['./routes/*.js']
};

// final definitions with swagger-express
const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

/* Routes middlewares */
app.use("/api", authRoutes);
app.use("/api", userRoutes);
app.use("/api", kingdomRoutes);
app.use("/api", groupRoutes);
app.use("/api", classificationRoutes);
app.use("/api", livingBeingRoutes);

// port
const port = process.env.PORT || 8000;

// listen port
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});



