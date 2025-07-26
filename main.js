import "./style.css";
import HavokPhysics from "https://cdn.babylonjs.com/havok/HavokPhysics_es.js";
import * as BABYLON from "@babylonjs/core";
import * as GUI from "@babylonjs/gui";
import { Inspector } from "@babylonjs/inspector";
import "@babylonjs/loaders";

import "@babylonjs/core/Materials/Node/Blocks";

var canvas = document.getElementById("renderCanvas");
const engine = new BABYLON.Engine(canvas, true);

var createScene = async function () {
  const scene = new BABYLON.Scene(engine);

  const camera = new BABYLON.UniversalCamera(
    "UniversalCamera",
    new BABYLON.Vector3(11, 2, 3.6147520098121584),
    scene
  );

  camera.attachControl(canvas, true);

  scene.gravity = new BABYLON.Vector3(0, -0.981, 0);

  scene.collisionsEnabled = true;

  camera.checkCollisions = true;
  camera.applyGravity = true;

  camera.speed = 0.2;
  camera.ellipsoid = new BABYLON.Vector3(0.1, 1.3, 0.1);
  camera.minZ = 1;

  var light = new BABYLON.HemisphericLight(
    "light",
    new BABYLON.Vector3(0, 1, 0),
    scene
  );

  var sphere = BABYLON.MeshBuilder.CreateSphere(
    "sphere",
    { diameter: 1, segments: 32 },
    scene
  );

  sphere.position.y = 3;

  const sphereMaterial = new BABYLON.StandardMaterial("sphereMaterial");

  sphere.material = sphereMaterial;

  scene.onPointerPick = (evt, pickInfo) => {
    if (pickInfo.pickedMesh === sphere) {
      sphere.material.diffuseColor = BABYLON.Color3.Random();
      Inspector.Show(scene, {});
    }
  };

  const xrHelper = await scene.createDefaultXRExperienceAsync({
    // floorMeshes: [ground],
    disableTeleportation: true,
    optionalFeatures: true,
  });

  const cameraXR = xrHelper.baseExperience.camera;
  cameraXR.checkCollisions = true;
  cameraXR.applyGravity = true;
  cameraXR.ellipsoid = new BABYLON.Vector3(0.1, 1, 0.1);

  const featureManager = xrHelper.baseExperience.featuresManager;

  featureManager.enableFeature(BABYLON.WebXRFeatureName.MOVEMENT, "latest", {
    xrInput: xrHelper.input,
    movementSpeed: 0.1,
  });

  crearInterfazColorParaMesh(scene, sphere);

  cargarModeloDIC(scene);

  crearMenuTeleport(camera);

  // Inspector.Show(scene, {});

  return scene;
};

const crearMenuTeleport = (camera) => {
  const advancedTexture =
    GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI");

  // Panel principal
  const panel = new GUI.StackPanel();
  panel.width = "250px";
  panel.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT;
  panel.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_CENTER;
  // panel.background = "linear-gradient(90deg, #60993e, #7afdd6)";
  panel.alpha = 0.95;
  panel.isVisible = false;
  panel.paddingTop = "20px";
  panel.paddingBottom = "20px";
  panel.paddingLeft = "20px";
  panel.paddingRight = "20px";
  panel.cornerRadius = 20;
  panel.thickness = 0;
  panel.shadowBlur = 15;
  // panel.shadowColor = "#00000088";
  advancedTexture.addControl(panel);

  // Título del menú
  const header = new GUI.TextBlock();
  header.height = "50px";
  header.color = "#1294e9";
  header.textHorizontalAlignment =
    GUI.Control.HORIZONTAL_ALIGNMENT_CENTER;
  header.fontSize = 24;
  header.fontWeight = "bold";
  panel.addControl(header);

  // Coordenadas de teleportación
  const teleportationPoints = [
    {
      name: "EXTERIOR",
      position: new BABYLON.Vector3(
        46.73377438796584,
        2.834045059382915,
        -9.977741470822195
      ),
      rotation: new BABYLON.Vector3(
        -0.13091305315161753,
        -1.5666839037695337,
        0
      ),
    },
    {
      name: "PUERTA PRINCIPAL",
      position: new BABYLON.Vector3(
        20.657262168640735,
        3.015,
        -25.80194953322415
      ),
      rotation: new BABYLON.Vector3(
        0.08895446692084238,
        -0.6550133275539474,
        0
      ),
    },
    {
      name: "FABLAB",
      position: new BABYLON.Vector3(6.4334839966221, 3.015, -6.699712759034688),
      rotation: new BABYLON.Vector3(
        0.08583966412317688,
        -1.1165051562456847,
        0
      ),
    },
    {
      name: "SALA ESTUDIO",
      position: new BABYLON.Vector3(
        -6.469127997900289,
        11.748262668790463,
        4.068790078881802
      ),
      rotation: new BABYLON.Vector3(0.1906907745619871, -4.117296201117559, 0),
    },
    {
      name: "SALA AUDIO",
      position: new BABYLON.Vector3(
        21.252828751316134,
        11.778261327232146,
        -8.841159425958358
      ),
      rotation: new BABYLON.Vector3(
        0.29280877971747976,
        -1.7235142651633595,
        0
      ),
    },
    {
      name: "SALA MULTIUSOS",
      position: new BABYLON.Vector3(
        -13.10821521787652,
        3.015,
        -25.80194648146629
      ),
      rotation: new BABYLON.Vector3(
        0.005116149976388614,
        0.8983130578482352,
        0
      ),
    },
  ];

  teleportationPoints.forEach((point) => {
    const button = GUI.Button.CreateSimpleButton(
      point.name,
      point.name
    );
    button.height = "50px";
    button.width = "250px";
    button.color = "white";
    button.background = "#05283f";
    button.fontSize = 24;

    // Hacer una copia de la posición y rotación originales
    const originalPosition = point.position.clone();
    const originalRotation = point.rotation.clone();

    // Acción de teletransporte
    button.onPointerClickObservable.add(() => {
      camera.checkCollisions = false;
      camera.position.copyFrom(originalPosition); // Usar la copia
      camera.rotation.copyFrom(originalRotation); // Usar la copia
      setTimeout(() => {
        camera.checkCollisions = true;
      }, 100);
    });

    button.onPointerOutObservable.add(() => {
      button.background = "#05283f";
    });

    panel.addControl(button);
  });

  // Botón desplegable
  const toggleButton = GUI.Button.CreateSimpleButton(
    "toggleMenu",
    "Menú"
  );
  toggleButton.width = "10%";
  toggleButton.height = "50px";
  toggleButton.color = "white";
  toggleButton.background = "#05283f";
  toggleButton.cornerRadius = 15;
  toggleButton.fontSize = 24;
  toggleButton.horizontalAlignment =
    GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT;
  toggleButton.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_TOP;

  toggleButton.onPointerClickObservable.add(() => {
    panel.isVisible = !panel.isVisible;
  });

  // Efecto hover simplificado en el botón de menú
  toggleButton.onPointerEnterObservable.add(() => {
    toggleButton.background = "#05283f";
  });

  advancedTexture.addControl(toggleButton);
};

// Crear botón interactivo para mostrar imagen
const crearBotonImagen = (name, position, imageUrl, scene) => {
  const plane = BABYLON.MeshBuilder.CreatePlane(name, { size: 1 }, scene);
  plane.position = position;

  const advancedTexture = GUI.AdvancedDynamicTexture.CreateForMesh(plane);

  const button = GUI.Button.CreateSimpleButton(name, "Ver Imagen");
  button.width = "150px";
  button.height = "50px";
  button.color = "white";
  button.background = "red";
  button.cornerRadius = 10;
  button.fontSize = 20;

  button.onPointerUpObservable.add(() => {
      mostrarImagen(scene, imageUrl);
  });

  advancedTexture.addControl(button);
};

// Mostrar imagen en la escena
const mostrarImagen = (scene, imageUrl) => {
  const imagePlane = BABYLON.MeshBuilder.CreatePlane("imagePlane", { width: 3, height: 1 }, scene);
  imagePlane.position = new BABYLON.Vector3(-0.5, 3, -2.5); // Ajusta la posición como desees
  imagePlane.isVisible = true;

  const advancedTexture = GUI.AdvancedDynamicTexture.CreateForMesh(imagePlane);

  const image = new GUI.Image("image", imageUrl);
  image.width = "100%";
  image.height = "100%";
  image.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_CENTER;
  image.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_CENTER;

  advancedTexture.addControl(image);
};

const cargarModeloDIC = (scene) => {
  BABYLON.SceneLoader.AppendAsync(
    "../models/", // Directorio del archivo
    "DIC.glb", // Nombre del archivo
    scene // La escena en la que se carga el modelo
  ).then(
    () => {
      console.log("Modelo cargado correctamente");

      // Obtener todas las meshes de la escena
      const meshes = scene.meshes;

      // Configurar colisiones para todas las meshes
      meshes.forEach((mesh) => {
        mesh.checkCollisions = true;
      });

      // Desactivar colisiones para impresoras
      const impresoras = meshes.filter((mesh) => mesh.name.includes("default"));
      impresoras.forEach((impresora) => {
        impresora.checkCollisions = false;
      });

      // Desactivar colisiones para portátiles
      const portatil = meshes.filter((mesh) => mesh.name.includes("victus"));
      portatil.forEach((victus) => {
        victus.checkCollisions = false;
      });

      const arduinos = meshes.filter((mesh) => mesh.name.includes("Object"));
      arduinos.forEach((object) => {
        object.checkCollisions = false;
      });
  
      const elementosInvisibles = meshes.filter((mesh) => mesh.name.includes("inv"));
      elementosInvisibles.forEach((inv) => {
        inv.checkCollisions = true;
      });

      const puerta = scene.meshes.find((mesh) => mesh.name === "Puerta");
      puerta.actionManager = new BABYLON.ActionManager(scene);
      let puertaPosicion = 0;

      // Registra la acción de clic
      puerta.actionManager.registerAction(
        new BABYLON.ExecuteCodeAction(
          BABYLON.ActionManager.OnPickTrigger, // Evento de clic
          () => {
            if (puertaPosicion == 0) {
              puerta.position.x = puerta.position.x + 2;
              puertaPosicion = 1;
            } else {
              puerta.position.x = puerta.position.x - 2;
              puertaPosicion = 0;
            }

            console.log("Puerta clickeada:", puerta.name);
          }
        )
      );
 
      crearBotonImagen("button1", new BABYLON.Vector3(2, 1, -3), "./public/CrealityCR-10SmartPro.png", scene);

      console.log("Configuración de colisiones completada.");
    },
    null, // Función de progreso (opcional)
    (message) => {
      // Función de error
      console.error("Error al cargar el modelo:", message);
    }
  );
}

function crearInterfazColorParaMesh(scene, mesh) {
  // Crear un plano que actuará como contenedor de la GUI
  const plane = BABYLON.MeshBuilder.CreatePlane("plane", { size: 1 }, scene);
  plane.position = new BABYLON.Vector3(0.4, 4, 0.4);

  // Crear una textura dinámica avanzada para la GUI
  const advancedTexture = GUI.AdvancedDynamicTexture.CreateForMesh(plane);

  // Crear un panel y agregarlo a la textura avanzada
  const panel = new GUI.StackPanel();
  advancedTexture.addControl(panel);

  // Crear un encabezado para la GUI
  const header = new GUI.TextBlock();
  header.text = "Color GUI";
  header.height = "100px";
  header.color = "white";
  header.textHorizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_CENTER;
  header.fontSize = "120";
  panel.addControl(header);

  // Crear un selector de color y configurarlo
  const picker = new GUI.ColorPicker();
  picker.value = mesh.material?.diffuseColor || new BABYLON.Color3(1, 1, 1); // Usar el color actual del material o blanco
  picker.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_CENTER;
  picker.height = "350px";
  picker.width = "350px";

  // Vincular el cambio de color al material del mesh
  picker.onValueChangedObservable.add(function (value) {
    if (mesh.material && mesh.material.diffuseColor) {
      mesh.material.diffuseColor.copyFrom(value);
    }
  });

  // Agregar el selector de color al panel
  panel.addControl(picker);

  return { plane, picker, advancedTexture };
}

createScene().then((sceneToRender) => {
  engine.runRenderLoop(() => {
    sceneToRender.render();

    // console.log(sceneToRender.activeCamera.position);
    // console.log(sceneToRender.activeCamera.camera.position);???

  });
});

window.addEventListener("resize", () => {
  engine.resize();
});