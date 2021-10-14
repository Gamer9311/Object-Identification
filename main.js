img = "";
status = "";
objects = [];

function preload()
{
    img = loadImage('dog_cat.jpg');
}

function setup()
{
    canvas = createCanvas(640, 420);
    canvas.position(300, 150);
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting Objects....";
}

function draw()
{
    image(img, 0, 0, 640, 420);

    if (status != "")
    {
        for (no = 0; no < objects.length; no++)
        {
            document.getElementById("status").innerHTML= "Status : Object Detected";

            fill("#0C0705");

            percent = floor(objects[no].confidence * 100);
            text(objects[no].label + " " + percent + "%", objects[no].x, objects[no].y);

            noFill();

            stroke("#0C0705");
            rect(objects[no].x, objects[no].y, objects[no].width, objects[no].height);
        }
    }
}

function modelLoaded()
{
    console.log("Model Loaded!");
    status = true;
    objectDetector.detect(img, gotResult);
}

function gotResult(error, results)
{
    if (error)
    {
        console.error(error);
    }
    console.log(results);

    objects = results;
}
