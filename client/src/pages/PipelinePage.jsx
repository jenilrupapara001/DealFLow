import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Plus, MoreHorizontal, DollarSign, Calendar, GripVertical, Info } from 'lucide-react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import AddDealModal from '../components/deals/AddDealModal';

const PipelinePage = () => {
    const [deals, setDeals] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const fetchDeals = async () => {
        try {
            const { data } = await axios.get('/api/deals');
            setDeals(data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchDeals();
    }, []);

    const stages = ['proposal', 'negotiation', 'closed-won', 'closed-lost'];
    const stageColors = {
        'proposal': {
            bg: 'bg-blue-500',
            lightBg: 'bg-blue-50/50',
            border: 'border-blue-200',
            text: 'text-blue-700',
            shadow: 'shadow-blue-500/20'
        },
        'negotiation': {
            bg: 'bg-orange-500',
            lightBg: 'bg-orange-50/50',
            border: 'border-orange-200',
            text: 'text-orange-700',
            shadow: 'shadow-orange-500/20'
        },
        'closed-won': {
            bg: 'bg-green-500',
            lightBg: 'bg-green-50/50',
            border: 'border-green-200',
            text: 'text-green-700',
            shadow: 'shadow-green-500/20'
        },
        'closed-lost': {
            bg: 'bg-slate-500',
            lightBg: 'bg-slate-50/50',
            border: 'border-slate-200',
            text: 'text-slate-700',
            shadow: 'shadow-slate-500/20'
        },
    };

    const onDragEnd = async (result) => {
        const { destination, source, draggableId } = result;

        if (!destination) return;

        if (
            destination.droppableId === source.droppableId &&
            destination.index === source.index
        ) {
            return;
        }

        const newStage = destination.droppableId;
        const dealId = draggableId;

        // Optimistic UI update
        const updatedDeals = [...deals];
        const dealIndex = updatedDeals.findIndex(d => d._id === dealId);
        if (dealIndex !== -1) {
            updatedDeals[dealIndex].stage = newStage;
            setDeals(updatedDeals);
        }

        try {
            await axios.put(`/api/deals/${dealId}`, { stage: newStage });
        } catch (err) {
            console.error('Failed to update deal stage:', err);
            fetchDeals(); // Revert on failure
        }
    };

    const getStageTotal = (stage) => {
        return deals
            .filter(d => d.stage === stage)
            .reduce((sum, d) => sum + (d.dealValue || 0), 0);
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-full">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
        );
    }

    return (
        <div className="h-full flex flex-col space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">Sales Pipeline</h1>
                    <p className="text-slate-500">Track and manage your high-value opportunities.</p>
                </div>
                <button onClick={() => setIsModalOpen(true)} className="btn-primary flex items-center space-x-2">
                    <Plus size={18} />
                    <span>New Deal</span>
                </button>
            </div>

            <AddDealModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onRefresh={fetchDeals}
            />

            <DragDropContext onDragEnd={onDragEnd}>
                <div className="flex-1 overflow-x-auto pb-6 -mx-6 px-6">
                    <div className="flex space-x-6 h-full min-h-[600px]">
                        {stages.map((stage) => (
                            <div key={stage} className="flex-1 min-w-[320px] max-w-[400px] flex flex-col">
                                <div className="mb-4 group">
                                    <div className="flex items-center justify-between mb-2">
                                        <div className="flex items-center space-x-2">
                                            <div className={`w-2 h-2 rounded-full ${stageColors[stage].bg} shadow-lg shadow-current/20`}></div>
                                            <h3 className="font-bold text-slate-800 capitalize tracking-tight">{stage.replace('-', ' ')}</h3>
                                            <span className="bg-slate-100 text-slate-500 px-2 py-0.5 rounded-md text-[10px] font-bold">
                                                {deals.filter(d => d.stage === stage).length}
                                            </span>
                                        </div>
                                        <button className="text-slate-300 hover:text-slate-500 transition-colors">
                                            <MoreHorizontal size={18} />
                                        </button>
                                    </div>
                                    <div className="flex items-center justify-between px-1">
                                        <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Total Value</div>
                                        <div className="text-xs font-bold text-slate-900">
                                            ${getStageTotal(stage).toLocaleString()}
                                        </div>
                                    </div>
                                    <div className={`h-1.5 w-full bg-slate-100 rounded-full mt-3 overflow-hidden shadow-inner`}>
                                        <div
                                            className={`h-full ${stageColors[stage].bg} transition-all duration-500 ease-out`}
                                            style={{ width: `${Math.min((getStageTotal(stage) / (getStageTotal('closed-won') || 100000)) * 100, 100)}%` }}
                                        ></div>
                                    </div>
                                </div>

                                <Droppable droppableId={stage}>
                                    {(provided, snapshot) => (
                                        <div
                                            {...provided.droppableProps}
                                            ref={provided.innerRef}
                                            className={`flex-1 rounded-2xl p-3 transition-colors duration-200 border-2 ${snapshot.isDraggingOver ? `${stageColors[stage].lightBg} ${stageColors[stage].border} border-dashed` : 'bg-slate-50/50 border-transparent hover:bg-slate-50'
                                                }`}
                                        >
                                            <div className="space-y-3">
                                                {deals
                                                    .filter((d) => d.stage === stage)
                                                    .map((deal, index) => (
                                                        <Draggable key={deal._id} draggableId={deal._id} index={index}>
                                                            {(provided, snapshot) => (
                                                                <div
                                                                    ref={provided.innerRef}
                                                                    {...provided.draggableProps}
                                                                    {...provided.dragHandleProps}
                                                                    className={`bg-white p-4 rounded-xl shadow-sm border border-slate-100 hover:shadow-md transition-all active:scale-[0.98] ${snapshot.isDragging ? 'shadow-2xl ring-2 ring-primary ring-opacity-10 rotate-2' : ''
                                                                        }`}
                                                                >
                                                                    <div className="flex justify-between items-start mb-3">
                                                                        <div className="flex items-center space-x-2">
                                                                            <GripVertical size={14} className="text-slate-300 pointer-events-none" />
                                                                            <div>
                                                                                <h4 className="font-bold text-slate-900 leading-tight truncate max-w-[180px]">
                                                                                    {deal.leadId?.name || 'Unknown Lead'}
                                                                                </h4>
                                                                                <p className="text-[11px] font-medium text-slate-500 mt-0.5">
                                                                                    {deal.leadId?.company || 'Personal Lead'}
                                                                                </p>
                                                                            </div>
                                                                        </div>
                                                                        <button className="text-slate-300 hover:text-slate-500">
                                                                            <Info size={16} />
                                                                        </button>
                                                                    </div>

                                                                    <div className="flex items-center justify-between pt-3 border-t border-slate-50">
                                                                        <div className="flex items-center bg-green-50 px-2 py-1 rounded-md">
                                                                            <DollarSign size={12} className="text-green-600 mr-1" />
                                                                            <span className="text-xs font-bold text-green-700">
                                                                                {deal.dealValue?.toLocaleString()}
                                                                            </span>
                                                                        </div>
                                                                        <div className="flex items-center text-slate-400 text-[10px] font-bold uppercase tracking-tight">
                                                                            <Calendar size={12} className="mr-1" />
                                                                            <span>{deal.expectedCloseDate ? new Date(deal.expectedCloseDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : 'N/A'}</span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            )}
                                                        </Draggable>
                                                    ))}
                                                {provided.placeholder}
                                            </div>

                                            <button
                                                onClick={() => setIsModalOpen(true)}
                                                className="w-full mt-4 py-3 bg-white/40 border-2 border-slate-200 border-dashed rounded-xl text-slate-400 text-xs font-bold hover:bg-white hover:text-slate-600 hover:border-slate-300 transition-all flex items-center justify-center space-x-2 group-hover:opacity-100"
                                            >
                                                <Plus size={14} />
                                                <span>ADD OPPORTUNITY</span>
                                            </button>
                                        </div>
                                    )}
                                </Droppable>
                            </div>
                        ))}
                    </div>
                </div>
            </DragDropContext>
        </div>
    );
};

export default PipelinePage;
