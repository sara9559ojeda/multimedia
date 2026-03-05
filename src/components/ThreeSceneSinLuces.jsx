import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { RectAreaLightHelper } from 'three/examples/jsm/helpers/RectAreaLightHelper.js';
import { RectAreaLightUniformsLib } from 'three/examples/jsm/lights/RectAreaLightUniformsLib.js';

//import GUI from 'lil-gui';

const ThreeSceneSinLuces = () => {
    const mountRef = useRef(null);

    useEffect(() => {
        // Verificar que el elemento existe
        if (!mountRef.current) return;

        /**
         * Base
         */
        const scene = new THREE.Scene();

        // Tamaño
        const sizes = {
            width: window.innerWidth,
            height: window.innerHeight
        };

        /**
         * Camera
         */

        scene.background = new THREE.Color(0x1e1e2f);
        scene.fog = new THREE.Fog(0x1e1e2f, 1, 10);

        const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100);
        camera.position.set(1, 1, 2);
        scene.add(camera);

        /**
         * Renderer
         */

        const cubeTextureLoader = new THREE.CubeTextureLoader();

        const environmentMap = cubeTextureLoader.load([
            '/environmentMaps/1/px.png',
            '/environmentMaps/1/nx.png',
            '/environmentMaps/1/py.png',
            '/environmentMaps/1/ny.png',
            '/environmentMaps/1/pz.png',
            '/environmentMaps/1/nz.png'
        ]);

        scene.background = environmentMap;
        scene.environment = environmentMap;




        const renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setSize(sizes.width, sizes.height);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        mountRef.current.appendChild(renderer.domElement);

        /**
         * Lights
         */
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.5); // Color blanco, intensidad 0.5
        scene.add(ambientLight);

        const directionalLight = new THREE.DirectionalLight(0xffcc00, 0.7);
        directionalLight.position.set(1, 1, 1);
        scene.add(directionalLight);

        const hemisphereLight = new THREE.HemisphereLight(0x0000ff, 0xff0000, 0.6);
        scene.add(hemisphereLight);

        const pointLight = new THREE.PointLight(0xff9000, 1, 10, 2);
        pointLight.position.set(0, 1, 2);
        scene.add(pointLight);


        const spotLight = new THREE.SpotLight(0x78ff00, 2, 10, Math.PI * 0.1, 0.25, 1);
        spotLight.position.set(0, 2, 3);
        scene.add(spotLight);

        RectAreaLightUniformsLib.init();
        const rectAreaLight = new THREE.RectAreaLight(0x4e00ff, 5, 3, 3);
        rectAreaLight.position.set(-1.5, 0, 1.5);
        scene.add(rectAreaLight);

        /**
         * Helpers
         * 
         * 
         *
         */

        const hemisphereLightHelper = new THREE.HemisphereLightHelper(hemisphereLight, 0.2);
        scene.add(hemisphereLightHelper);

        const directionalLightHelper = new THREE.DirectionalLightHelper(directionalLight, 0.2);
        scene.add(directionalLightHelper);

        const pointLightHelper = new THREE.PointLightHelper(pointLight, 0.2);
        scene.add(pointLightHelper);

        const spotLightHelper = new THREE.SpotLightHelper(spotLight);
        scene.add(spotLightHelper);

        const rectAreaLightHelper = new RectAreaLightHelper(rectAreaLight);
        scene.add(rectAreaLightHelper);

        /**
         * Objects
         */
        const material = new THREE.MeshStandardMaterial({ roughness: 0.4 });

        const sphere = new THREE.Mesh(new THREE.SphereGeometry(0.5, 32, 32), material);
        sphere.position.x = -1.5;

        const cube = new THREE.Mesh(new THREE.BoxGeometry(0.75, 0.75, 0.75), material);
        const torus = new THREE.Mesh(new THREE.TorusGeometry(0.3, 0.2, 32, 64), material);
        torus.position.x = 1.5;

        /*const plane = new THREE.Mesh(new THREE.PlaneGeometry(5, 5), material);
        plane.rotation.x = -Math.PI * 0.5;
        plane.position.y = -0.65;*/

        scene.add(sphere, cube, torus /*, plane*/);

        /**
         * Controls
         */
        const controls = new OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true;

        /**
         * GUI (Lil-GUI)
         */
        //const gui = new GUI();
        //gui.add(ambientLight, 'intensity').min(0).max(3).step(0.001);

        /**
         * Resize Handling
         */
        const handleResize = () => {
            sizes.width = window.innerWidth;
            sizes.height = window.innerHeight;

            camera.aspect = sizes.width / sizes.height;
            camera.updateProjectionMatrix();

            renderer.setSize(sizes.width, sizes.height);
            renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        };
        window.addEventListener('resize', handleResize);

        /**
         * Animate
         */
        const clock = new THREE.Clock();
        const tick = () => {
            const elapsedTime = clock.getElapsedTime();

            sphere.rotation.y = 0.1 * elapsedTime;
            cube.rotation.y = 0.1 * elapsedTime;
            torus.rotation.y = 0.1 * elapsedTime;

            sphere.rotation.x = 0.15 * elapsedTime;
            cube.rotation.x = 0.15 * elapsedTime;
            torus.rotation.x = 0.15 * elapsedTime;

            controls.update();
            renderer.render(scene, camera);
            requestAnimationFrame(tick);
        };
        tick();

        /**
         * Cleanup on Unmount
         */
        return () => {
            //gui.destroy();
            window.removeEventListener('resize', handleResize);
            mountRef.current.removeChild(renderer.domElement);
        };
    }, []);

    return <div ref={mountRef} style={{ width: '100vw', height: '100vh' }} />;
};

export default ThreeSceneSinLuces;
