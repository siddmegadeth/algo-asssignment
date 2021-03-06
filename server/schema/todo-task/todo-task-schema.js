(function() {


    // Task Tuple Standalone Schema
    TaskTupleSchema = module.exports = mongoose.Schema({
        header: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true,
        },
        created_at: { type: Date, default: Date.now },
        updated_at: { type: Date, default: Date.now }
    });


    TaskTupleSchema.pre('save', function(next) {
        log("Saving Todo Data :");
        now = new Date();
        this.updated_at = now;
        if (!this.created_at) {
            this.created_at = now
        }
        next();
    });

    taskTupleModel = module.exports = mongoose.model("TaskTupleModel", TaskTupleSchema);




    // Core Task Schema Mapped To User Generated Task
    ToDoTaskSchema = module.exports = mongoose.Schema({
        username: {
            type: String,
            unique: true,
            index: true,
            required: true
        },
        task: [TaskTupleSchema],
        created_at: { type: Date, default: Date.now },
        updated_at: { type: Date, default: Date.now }
    });


    ToDoTaskSchema.pre('save', function(next) {
        log("Saving Todo Data :");
        now = new Date();
        this.updated_at = now;
        if (!this.created_at) {
            this.created_at = now
        }
        next();
    });

    taskToDoModel = module.exports = mongoose.model("taskToDoModel", ToDoTaskSchema);

})()