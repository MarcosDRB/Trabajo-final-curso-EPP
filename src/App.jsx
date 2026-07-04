import { useEffect, useMemo, useState } from 'react'
import {
  HashRouter,
  Link,
  NavLink,
  Navigate,
  Route,
  Routes,
  useNavigate,
  useParams,
} from 'react-router-dom'
import './App.css'

const STORAGE_KEY = 'curso-epp-v1'
const PASS_SCORE = 70

const LESSONS = [
  {
    id: 'casco',
    modulo: 'Modulo 1',
    title: 'Proteccion de cabeza y casco industrial',
    summary: 'Cuando usar casco, clases y ajuste seguro.',
    body: [
      'El casco protege frente a golpes, caida de objetos y contacto electrico segun su clase.',
      'Revisa fecha de fabricacion, fisuras, sistema de suspension y correa antes de cada turno.',
      'No perforar ni pintar con solventes porque se reduce la resistencia del material.',
    ],
    imageAlt: 'Trabajador con casco de seguridad',
    imageUrl:
      'https://images.unsplash.com/photo-1581092334651-ddf26d9a09d0?auto=format&fit=crop&w=900&q=80',
    videoUrl:
      'https://www.youtube.com/results?search_query=capacitacion+casco+industrial+epp',
    exercise: {
      type: 'single',
      question: 'Que accion es correcta antes de usar el casco?',
      options: [
        'Perforarlo para mejor ventilacion',
        'Verificar suspension y estado general',
        'Usarlo sin ajustar la correa',
      ],
      answer: 'Verificar suspension y estado general',
      explanation:
        'La inspeccion previa reduce fallos del EPP durante impactos reales.',
    },
    finalQuestion: {
      question: 'Antes de usar un casco industrial se debe...',
      options: ['Verificar suspension y carcasa', 'Perforar para ventilar', 'Usar sin ajuste'],
      answer: 'Verificar suspension y carcasa',
    },
  },
  {
    id: 'ocular',
    modulo: 'Modulo 2',
    title: 'Proteccion ocular y facial',
    summary: 'Gafas, caretas y seleccion por riesgo.',
    body: [
      'Los ojos son vulnerables a particulas, salpicaduras quimicas y radiacion por soldadura.',
      'Combina gafas cerradas con careta cuando exista riesgo de impacto frontal y lateral.',
      'Limpia con panos no abrasivos y guarda en estuche para evitar rayaduras.',
    ],
    imageAlt: 'Persona usando gafas y pantalla facial',
    imageUrl:
      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=900&q=80',
    videoUrl:
      'https://www.youtube.com/results?search_query=proteccion+ocular+y+facial+epp',
    exercise: {
      type: 'boolean',
      question:
        'Verdadero o falso: Las gafas personales sustituyen siempre las gafas de seguridad.',
      answer: 'Falso',
      explanation:
        'Las gafas personales no estan certificadas para impacto industrial.',
    },
    finalQuestion: {
      question: 'Para riesgo de salpicaduras quimicas se recomienda...',
      options: ['Gafas cerradas certificadas', 'Lentes de sol', 'No usar proteccion'],
      answer: 'Gafas cerradas certificadas',
    },
  },
  {
    id: 'respiratoria',
    modulo: 'Modulo 3',
    title: 'Proteccion respiratoria',
    summary: 'Mascarillas, filtros y ajuste facial.',
    body: [
      'Selecciona el respirador segun polvo, vapor o gas presente en el puesto de trabajo.',
      'Realiza prueba de ajuste para asegurar sello y evitar fugas en la zona nasal.',
      'Cambia filtros por vida util, saturacion o dano visible del cartucho.',
    ],
    imageAlt: 'Trabajadora usando respirador',
    imageUrl:
      'https://images.unsplash.com/photo-1584036561566-baf8f5f1b144?auto=format&fit=crop&w=900&q=80',
    videoUrl:
      'https://www.youtube.com/results?search_query=proteccion+respiratoria+epp+capacitacion',
    exercise: {
      type: 'text',
      question: 'Completa: El respirador debe hacer buen ______ en el rostro.',
      answer: 'sello',
      explanation:
        'Sin sello facial adecuado el contaminante entra por los bordes del respirador.',
    },
    finalQuestion: {
      question: 'La prueba de ajuste del respirador verifica el...',
      options: ['Sello facial', 'Color del filtro', 'Tamano del casco'],
      answer: 'Sello facial',
    },
  },
  {
    id: 'manos',
    modulo: 'Modulo 4',
    title: 'Proteccion de manos y pies',
    summary: 'Guantes y botas segun actividad.',
    body: [
      'No existe guante universal: cada material protege frente a riesgos especificos.',
      'Las botas con puntera y suela antideslizante reducen lesiones por impacto y caidas.',
      'Retira guantes contaminados sin tocar la piel para evitar exposicion secundaria.',
    ],
    imageAlt: 'Guantes y botas de seguridad',
    imageUrl:
      'https://images.unsplash.com/photo-1618477247222-acbdb0e159b3?auto=format&fit=crop&w=900&q=80',
    videoUrl:
      'https://www.youtube.com/results?search_query=guantes+y+botas+de+seguridad+epp',
    exercise: {
      type: 'single',
      question: 'Que criterio define la eleccion del guante?',
      options: [
        'Color del uniforme',
        'Tipo de riesgo y material a manipular',
        'Marca mas economica',
      ],
      answer: 'Tipo de riesgo y material a manipular',
      explanation:
        'La compatibilidad quimica y mecanica es el criterio tecnico correcto.',
    },
    finalQuestion: {
      question: 'La seleccion del guante debe basarse en...',
      options: ['Precio', 'Tipo de riesgo', 'Color corporativo'],
      answer: 'Tipo de riesgo',
    },
  },
  {
    id: 'auditiva',
    modulo: 'Modulo 5',
    title: 'Proteccion auditiva y cultura preventiva',
    summary: 'Control del ruido y habitos de seguridad.',
    body: [
      'La exposicion prolongada a ruido sobre limites permitidos causa perdida auditiva irreversible.',
      'Tapones y orejeras deben tener nivel de atenuacion acorde al mapa de ruido del area.',
      'La seguridad efectiva combina EPP, capacitacion y reporte temprano de actos inseguros.',
    ],
    imageAlt: 'Operario usando orejeras de proteccion',
    imageUrl:
      'https://images.unsplash.com/photo-1581092583537-20d51b4b4f1b?auto=format&fit=crop&w=900&q=80',
    videoUrl:
      'https://www.youtube.com/results?search_query=proteccion+auditiva+epp+capacitacion',
    exercise: {
      type: 'boolean',
      question: 'Verdadero o falso: La proteccion auditiva es opcional en zona ruidosa.',
      answer: 'Falso',
      explanation:
        'Cuando el ruido supera limites, el uso de proteccion auditiva es obligatorio.',
    },
    finalQuestion: {
      question: 'En zonas con alto ruido la proteccion auditiva es...',
      options: ['Opcional', 'Obligatoria', 'Solo para supervisores'],
      answer: 'Obligatoria',
    },
  },
  {
    id: 'visibilidad',
    modulo: 'Modulo 6',
    title: 'Ropa de alta visibilidad',
    summary: 'Chalecos reflectivos y control visual en areas operativas.',
    body: [
      'La ropa de alta visibilidad mejora deteccion de personas en obras, vias y bodegas.',
      'Debe mantenerse limpia y con bandas reflectivas sin desgaste para conservar efectividad.',
      'El color y clase del chaleco se seleccionan segun velocidad del trafico y condiciones de luz.',
    ],
    imageAlt: 'Trabajador con chaleco reflectivo',
    imageUrl:
      'https://images.unsplash.com/photo-1590490359854-dfba19688d70?auto=format&fit=crop&w=900&q=80',
    videoUrl:
      'https://www.youtube.com/results?search_query=chaleco+reflectivo+alta+visibilidad+epp',
    exercise: {
      type: 'single',
      question: 'La funcion principal del chaleco reflectivo es...',
      options: ['Dar calor', 'Aumentar visibilidad', 'Sujetar herramientas'],
      answer: 'Aumentar visibilidad',
      explanation:
        'Su objetivo es que el trabajador sea identificado rapidamente en ambientes de riesgo.',
    },
    finalQuestion: {
      question: 'La ropa de alta visibilidad ayuda a prevenir...',
      options: ['Deshidratacion', 'Atropellos y choques', 'Ruido excesivo'],
      answer: 'Atropellos y choques',
    },
  },
  {
    id: 'alturas',
    modulo: 'Modulo 7',
    title: 'Trabajo en alturas y arnes',
    summary: 'Inspeccion y uso seguro del sistema anticaidas.',
    body: [
      'El arnes de cuerpo completo distribuye fuerzas de detencion durante una caida.',
      'Antes de usarlo revisa costuras, hebillas, argollas y fecha de inspeccion del equipo.',
      'El punto de anclaje debe estar certificado y por encima del trabajador cuando sea posible.',
    ],
    imageAlt: 'Tecnico con arnes de seguridad',
    imageUrl:
      'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=900&q=80',
    videoUrl:
      'https://www.youtube.com/results?search_query=trabajo+en+alturas+arnes+seguridad+capacitacion',
    exercise: {
      type: 'boolean',
      question: 'Verdadero o falso: Cualquier punto metalico sirve como anclaje.',
      answer: 'Falso',
      explanation:
        'El anclaje debe estar certificado para resistencia y ubicacion segura.',
    },
    finalQuestion: {
      question: 'Para trabajo en alturas el anclaje debe ser...',
      options: ['Improvisado', 'Certificado', 'Opcional'],
      answer: 'Certificado',
    },
  },
  {
    id: 'mantenimiento',
    modulo: 'Modulo 8',
    title: 'Mantenimiento y almacenamiento del EPP',
    summary: 'Vida util del EPP, limpieza y reposicion.',
    body: [
      'Un EPP deteriorado pierde capacidad de proteccion aunque se vea utilizable.',
      'Limpieza, secado y almacenamiento correcto evitan deformaciones y contaminacion.',
      'Toda empresa debe contar con registro de entrega, reemplazo y capacitacion de uso.',
    ],
    imageAlt: 'Zona de almacenamiento de equipos de seguridad',
    imageUrl:
      'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=900&q=80',
    videoUrl:
      'https://www.youtube.com/results?search_query=mantenimiento+y+almacenamiento+de+epp',
    exercise: {
      type: 'text',
      question: 'Completa: Un EPP danado debe ser ______ inmediatamente.',
      answer: 'reemplazado',
      explanation:
        'No se debe reutilizar EPP comprometido porque incrementa el riesgo de accidente.',
    },
    finalQuestion: {
      question: 'Cuando un EPP presenta dano visible se debe...',
      options: ['Seguir usandolo', 'Reemplazarlo', 'Pintarlo'],
      answer: 'Reemplazarlo',
    },
  },
]

const FINAL_QUESTION_BANK = LESSONS.map((lesson) => ({
  id: `q-${lesson.id}`,
  topic: lesson.title,
  question: lesson.finalQuestion.question,
  options: lesson.finalQuestion.options,
  answer: lesson.finalQuestion.answer,
}))

function shuffle(array) {
  const copy = [...array]
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1))
    const tmp = copy[i]
    copy[i] = copy[j]
    copy[j] = tmp
  }
  return copy
}

function loadStoredProgress() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (!saved) {
      return {
        studentName: 'Aprendiz SST',
        completedLessons: [],
        lessonAnswers: {},
        finalResult: null,
      }
    }
    const parsed = JSON.parse(saved)
    return {
      studentName: parsed.studentName || 'Aprendiz SST',
      completedLessons: Array.isArray(parsed.completedLessons)
        ? parsed.completedLessons
        : [],
      lessonAnswers: parsed.lessonAnswers || {},
      finalResult: parsed.finalResult || null,
    }
  } catch {
    return {
      studentName: 'Aprendiz SST',
      completedLessons: [],
      lessonAnswers: {},
      finalResult: null,
    }
  }
}

function saveProgress(next) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
}

function App() {
  const [progress, setProgress] = useState(() => loadStoredProgress())
  const [finalQuestions, setFinalQuestions] = useState(() =>
    shuffle(FINAL_QUESTION_BANK).slice(0, 8),
  )

  const progressMetrics = useMemo(() => {
    const lessonTotal = LESSONS.length
    const completedLessons = progress.completedLessons.length
    const lessonPercent = Math.round((completedLessons / lessonTotal) * 100)

    const exerciseCorrect = LESSONS.filter(
      (lesson) => progress.lessonAnswers[lesson.id]?.isCorrect,
    ).length

    const canAttemptFinal = completedLessons === lessonTotal

    return {
      lessonTotal,
      completedLessons,
      lessonPercent,
      exerciseCorrect,
      canAttemptFinal,
    }
  }, [progress.completedLessons, progress.lessonAnswers])

  const updateProgress = (updater) => {
    setProgress((prev) => {
      const next = typeof updater === 'function' ? updater(prev) : updater
      saveProgress(next)
      return next
    })
  }

  const markLessonCompleted = (lessonId) => {
    updateProgress((prev) => {
      if (prev.completedLessons.includes(lessonId)) {
        return prev
      }
      return {
        ...prev,
        completedLessons: [...prev.completedLessons, lessonId],
      }
    })
  }

  const registerLessonExercise = (lessonId, isCorrect) => {
    updateProgress((prev) => ({
      ...prev,
      lessonAnswers: {
        ...prev.lessonAnswers,
        [lessonId]: { isCorrect, checkedAt: Date.now() },
      },
    }))
  }

  const submitFinalExam = (answersByQuestionId) => {
    const details = finalQuestions.map((q) => ({
      ...q,
      selected: answersByQuestionId[q.id] || '',
      isCorrect: answersByQuestionId[q.id] === q.answer,
    }))

    const correct = details.filter((item) => item.isCorrect).length
    const score = Math.round((correct / details.length) * 100)

    const topicStats = details.reduce((acc, item) => {
      const key = item.topic
      if (!acc[key]) {
        acc[key] = { total: 0, correct: 0 }
      }
      acc[key].total += 1
      if (item.isCorrect) {
        acc[key].correct += 1
      }
      return acc
    }, {})

    const dominatedTopics = Object.entries(topicStats)
      .filter(([, stat]) => Math.round((stat.correct / stat.total) * 100) >= 70)
      .map(([topic]) => topic)

    const finalResult = {
      score,
      approved: score >= PASS_SCORE,
      correct,
      total: details.length,
      details,
      topicStats,
      dominatedTopics,
      createdAt: new Date().toISOString(),
    }

    updateProgress((prev) => ({
      ...prev,
      finalResult,
    }))
  }

  const resetFinalAttempt = () => {
    setFinalQuestions(shuffle(FINAL_QUESTION_BANK).slice(0, 8))
    updateProgress((prev) => ({
      ...prev,
      finalResult: null,
    }))
  }

  return (
    <HashRouter>
      <div className="platform">
        <header className="topbar">
          <div>
            <p className="eyebrow">Plataforma educativa</p>
            <h1>Curso tecnico: Equipos de Proteccion Personal</h1>
          </div>
          <nav aria-label="Navegacion principal" className="main-nav">
            <NavLink to="/">Inicio</NavLink>
            <NavLink to="/lecciones/casco">Lecciones</NavLink>
            <NavLink to="/evaluacion">Evaluacion final</NavLink>
          </nav>
        </header>

        <div className="layout">
          <main className="content-area">
            <Routes>
              <Route
                path="/"
                element={
                  <HomePage
                    studentName={progress.studentName}
                    onNameChange={(name) =>
                      updateProgress((prev) => ({ ...prev, studentName: name }))
                    }
                    metrics={progressMetrics}
                  />
                }
              />
              <Route
                path="/lecciones/:lessonId"
                element={
                  <LessonPage
                    lessons={LESSONS}
                    completedLessons={progress.completedLessons}
                    lessonAnswers={progress.lessonAnswers}
                    onComplete={markLessonCompleted}
                    onExerciseCheck={registerLessonExercise}
                  />
                }
              />
              <Route
                path="/evaluacion"
                element={
                  <FinalEvaluationPage
                    canAttemptFinal={progressMetrics.canAttemptFinal}
                    finalQuestions={finalQuestions}
                    finalResult={progress.finalResult}
                    onSubmit={submitFinalExam}
                    onRetry={resetFinalAttempt}
                  />
                }
              />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>

          <aside className="progress-panel" aria-label="Panel de progreso">
            <h2>Progreso del curso</h2>
            <p>
              Lecciones completadas: {progressMetrics.completedLessons} /
              {progressMetrics.lessonTotal}
            </p>
            <div className="meter" role="presentation">
              <span style={{ width: `${progressMetrics.lessonPercent}%` }}></span>
            </div>
            <p>
              Actividades correctas: {progressMetrics.exerciseCorrect} /
              {progressMetrics.lessonTotal}
            </p>
            <p>
              Estado evaluacion:{' '}
              {progress.finalResult
                ? progress.finalResult.approved
                  ? 'Aprobada'
                  : 'No aprobada'
                : 'Pendiente'}
            </p>
            {progress.finalResult && (
              <p>Ultimo puntaje final: {progress.finalResult.score}%</p>
            )}
            <div className="aside-links">
              {LESSONS.map((lesson) => (
                <Link key={lesson.id} to={`/lecciones/${lesson.id}`}>
                  {lesson.title}
                </Link>
              ))}
            </div>
          </aside>
        </div>

        <footer className="site-footer">
          Craedo y Desarrolado por Karol Cortes, Lian Orozco, Marcos Rojano,
          Rafael Rodelo
        </footer>
      </div>
    </HashRouter>
  )
}

function HomePage({ studentName, onNameChange, metrics }) {
  return (
    <section className="card intro-card">
      <p className="eyebrow">Objetivo del proyecto</p>
      <h2>
        Aprende uso correcto de EPP con lecciones, ejercicios practicos y
        evaluacion final
      </h2>
      <p>
        Debes completar las {metrics.lessonTotal} lecciones y alcanzar al menos
        {PASS_SCORE}% en la evaluacion final para aprobar.
      </p>
      <label htmlFor="student-name" className="field">
        Nombre del estudiante
        <input
          id="student-name"
          value={studentName}
          onChange={(event) => onNameChange(event.target.value)}
          placeholder="Escribe tu nombre"
        />
      </label>
      <div className="status-grid">
        <article>
          <h3>Lecciones</h3>
          <p>{metrics.lessonPercent}% completado</p>
        </article>
        <article>
          <h3>Actividades</h3>
          <p>{metrics.exerciseCorrect} correctas</p>
        </article>
        <article>
          <h3>Evaluacion</h3>
          <p>{metrics.canAttemptFinal ? 'Disponible' : 'Bloqueada'}</p>
        </article>
      </div>
      <Link className="cta" to="/lecciones/casco">
        Iniciar curso
      </Link>
    </section>
  )
}

function LessonPage({
  lessons,
  completedLessons,
  lessonAnswers,
  onComplete,
  onExerciseCheck,
}) {
  const { lessonId } = useParams()
  const navigate = useNavigate()

  const lessonIndex = lessons.findIndex((item) => item.id === lessonId)
  const lesson = lessonIndex >= 0 ? lessons[lessonIndex] : lessons[0]
  const isCompleted = completedLessons.includes(lesson.id)
  const answerState = lessonAnswers[lesson.id]

  const previousLesson = lessonIndex > 0 ? lessons[lessonIndex - 1] : null
  const nextLesson =
    lessonIndex >= 0 && lessonIndex < lessons.length - 1
      ? lessons[lessonIndex + 1]
      : null

  return (
    <article className="card lesson-card">
      <p className="eyebrow">{lesson.modulo}</p>
      <h2>{lesson.title}</h2>
      <p>{lesson.summary}</p>

      <img src={lesson.imageUrl} alt={lesson.imageAlt} className="lesson-image" />

      <ul className="lesson-list">
        {lesson.body.map((line) => (
          <li key={line}>{line}</li>
        ))}
      </ul>

      <a href={lesson.videoUrl} target="_blank" rel="noreferrer" className="video-link">
        Ver videos de apoyo
      </a>

      <div className="lesson-actions">
        <button type="button" onClick={() => onComplete(lesson.id)}>
          {isCompleted ? 'Leccion ya completada' : 'Marcar leccion como completada'}
        </button>
        <span>{isCompleted ? 'Completada' : 'Pendiente'}</span>
      </div>

      <LessonExercise
        lesson={lesson}
        previousAnswer={answerState}
        onEvaluate={(isCorrect) => onExerciseCheck(lesson.id, isCorrect)}
      />

      <div className="sequence-nav">
        <button
          type="button"
          disabled={!previousLesson}
          onClick={() => previousLesson && navigate(`/lecciones/${previousLesson.id}`)}
        >
          Anterior
        </button>
        <button
          type="button"
          disabled={!nextLesson}
          onClick={() => nextLesson && navigate(`/lecciones/${nextLesson.id}`)}
        >
          Siguiente
        </button>
      </div>
    </article>
  )
}

function LessonExercise({ lesson, previousAnswer, onEvaluate }) {
  const [selection, setSelection] = useState('')
  const [feedback, setFeedback] = useState(null)

  useEffect(() => {
    setSelection('')
    setFeedback(null)
  }, [lesson.id])

  const evaluate = () => {
    let isCorrect = false

    if (lesson.exercise.type === 'text') {
      isCorrect =
        selection.trim().toLowerCase() ===
        String(lesson.exercise.answer).toLowerCase()
    } else {
      isCorrect = selection === lesson.exercise.answer
    }

    const result = { isCorrect }
    setFeedback(result)
    onEvaluate(isCorrect)
  }

  return (
    <section className="exercise">
      <h3>Ejercicio interactivo</h3>
      <p>{lesson.exercise.question}</p>

      {lesson.exercise.type === 'single' && (
        <div className="options">
          {lesson.exercise.options.map((option) => (
            <label key={option}>
              <input
                type="radio"
                name={`exercise-${lesson.id}`}
                value={option}
                checked={selection === option}
                onChange={(event) => setSelection(event.target.value)}
              />
              {option}
            </label>
          ))}
        </div>
      )}

      {lesson.exercise.type === 'boolean' && (
        <div className="options inline-options">
          {['Verdadero', 'Falso'].map((option) => (
            <button
              key={option}
              type="button"
              className={selection === option ? 'active' : ''}
              onClick={() => setSelection(option)}
            >
              {option}
            </button>
          ))}
        </div>
      )}

      {lesson.exercise.type === 'text' && (
        <input
          className="text-answer"
          value={selection}
          onChange={(event) => setSelection(event.target.value)}
          placeholder="Escribe tu respuesta"
        />
      )}

      <button type="button" onClick={evaluate} disabled={!selection.trim()}>
        Validar respuesta
      </button>

      {previousAnswer && !feedback && (
        <p className="hint">Ya habias validado esta actividad antes.</p>
      )}

      {feedback && (
        <p className={feedback.isCorrect ? 'ok' : 'error'}>
          {feedback.isCorrect ? 'Correcto' : 'Incorrecto'} -{' '}
          {lesson.exercise.explanation}
        </p>
      )}
    </section>
  )
}

function FinalEvaluationPage({
  canAttemptFinal,
  finalQuestions,
  finalResult,
  onSubmit,
  onRetry,
}) {
  const [answers, setAnswers] = useState({})
  const [showResult, setShowResult] = useState(false)

  useEffect(() => {
    setAnswers({})
    setShowResult(false)
  }, [finalQuestions])

  if (!canAttemptFinal) {
    return (
      <section className="card">
        <h2>Evaluacion final bloqueada</h2>
        <p>Completa todas las lecciones antes de iniciar la prueba final.</p>
      </section>
    )
  }

  const submit = () => {
    onSubmit(answers)
    setShowResult(true)
  }

  return (
    <section className="card final-card">
      <h2>Evaluacion final del curso</h2>
      <p>
        Responde preguntas aleatorias del curso. Puntaje minimo para aprobar:
        {PASS_SCORE}%.
      </p>

      <ol className="question-list">
        {finalQuestions.map((question) => (
          <li key={question.id}>
            <h3>{question.question}</h3>
            <div className="options">
              {question.options.map((option) => (
                <label key={option}>
                  <input
                    type="radio"
                    name={question.id}
                    value={option}
                    checked={answers[question.id] === option}
                    onChange={(event) =>
                      setAnswers((prev) => ({
                        ...prev,
                        [question.id]: event.target.value,
                      }))
                    }
                  />
                  {option}
                </label>
              ))}
            </div>
          </li>
        ))}
      </ol>

      <button type="button" onClick={submit}>
        Calcular resultado
      </button>

      {finalResult && showResult && (
        <div className="result-box">
          <h3>
            Resultado: {finalResult.score}% ({finalResult.correct}/
            {finalResult.total})
          </h3>
          <p>
            Estado: {finalResult.approved ? 'Aprobado' : 'No aprobado'}
          </p>

          <h4>Estadisticas por tema</h4>
          <ul>
            {Object.entries(finalResult.topicStats).map(([topic, stats]) => {
              const pct = Math.round((stats.correct / stats.total) * 100)
              return (
                <li key={topic}>
                  {topic}: {pct}% ({stats.correct}/{stats.total})
                </li>
              )
            })}
          </ul>

          <p>
            Temas dominados (&gt;=70%):{' '}
            {finalResult.dominatedTopics.length > 0
              ? finalResult.dominatedTopics.join(', ')
              : 'Ninguno aun'}
          </p>

          <button type="button" onClick={onRetry}>
            Nueva evaluacion aleatoria
          </button>
        </div>
      )}
    </section>
  )
}

export default App
