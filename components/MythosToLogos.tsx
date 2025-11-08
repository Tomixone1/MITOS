import React from 'react';
import ScrollIcon from './icons/ScrollIcon';

const MythosToLogos: React.FC = () => {
  return (
    <div className="w-full p-6 bg-parchment border border-ink/10 rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold text-center mb-4 text-ink flex items-center justify-center gap-3">
        <ScrollIcon className="w-7 h-7 text-sky" />
        Del Mito al Logos: El Nacimiento de la Filosofía
      </h2>
      <div className="prose max-w-none text-ink prose-headings:text-sky prose-strong:text-ink text-justify">
        <p>
          Antes de que existiera la ciencia o la filosofía, los antiguos griegos explicaban el mundo a través del <strong>Mito</strong> (<em>Mythos</em>). Eran historias fascinantes sobre dioses, héroes y monstruos que daban sentido a todo: la creación del universo, los fenómenos naturales como los rayos y las estaciones, e incluso los sentimientos humanos como el amor y la guerra. Poetas como <strong>Homero</strong> (autor de la <em>Ilíada</em> y la <em>Odisea</em>) nos contaban un mundo donde los dioses intervenían constantemente en la vida de los mortales.
        </p>
        <h3 className="text-xl font-bold mt-4 mb-2">El Despertar de la Razón</h3>
        <p>
          Pero alrededor del siglo VI a.C. en las costas de Jonia (actual Turquía), algo increíble comenzó a suceder. Un grupo de pensadores, hoy conocidos como los <strong>Presocráticos</strong>, dejaron de conformarse con las explicaciones míticas. Empezaron a buscar una nueva forma de entender la realidad: el <strong>Logos</strong>, que significa "razón", "palabra" o "explicación racional".
        </p>
        <p>
          Filósofos como <strong>Tales de Mileto</strong> se preguntaron: "¿De qué está hecho todo?". En lugar de decir "de la voluntad de los dioses", propuso que todo provenía de un elemento natural: el agua. Otros, como Anaximandro o Heráclito, ofrecieron otras respuestas, pero lo revolucionario era el método: observar la naturaleza y usar la lógica para encontrar principios universales. Estaban inventando la ciencia y la filosofía.
        </p>
        <h3 className="text-xl font-bold mt-4 mb-2">Sócrates y la Explosión del Pensamiento Crítico</h3>
        <p>
          Un siglo más tarde, en Atenas, esta revolución del pensamiento llegó a su punto culminante con <strong>Sócrates</strong>. Él llevó el Logos a las calles. No se interesaba tanto por el origen del cosmos, sino por el ser humano: ¿Qué es la justicia? ¿Qué es la virtud? ¿Qué es el conocimiento?
        </p>
        <p>
          Su método era el diálogo y la pregunta constante. Cuestionaba todo lo que la gente creía saber, demostrando que muchas de sus certezas se basaban en la costumbre y no en la razón. Esta actitud crítica le costó la vida. En el 399 a.C., fue condenado a muerte por "corromper a la juventud" y "no creer en los dioses de la ciudad". Su muerte se convirtió en el símbolo del conflicto entre el pensamiento dogmático del mito y la libertad indagadora del logos. Con Sócrates, la filosofía se consolidó como el ejercicio de pensar por uno mismo, una herencia que define nuestra civilización.
        </p>
      </div>
    </div>
  );
};

export default MythosToLogos;